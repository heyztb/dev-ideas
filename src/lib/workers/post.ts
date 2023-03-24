import { expose } from "threads";
import type { Post } from "$lib/models/post";
import { REDDIT_CLIENT_ID, REDDIT_CLIENT_SECRET } from "$env/static/private";
import Snoowrap from 'snoowrap'
import { userAgent } from "$lib/reddit";

type createPostReturnData = {
	submission_id: string 
	error: string
}

type fetchCommentsReturnData = {
	comments: Snoowrap.Listing<Snoowrap.Comment> | null
	error: string
}

expose({
	async createPost(refreshToken: string, subreddit: string, post: Post): Promise<createPostReturnData> {
		const r = new Snoowrap({
			userAgent,
			clientId: REDDIT_CLIENT_ID,
			clientSecret: REDDIT_CLIENT_SECRET,
			refreshToken,
		})

		const data: createPostReturnData = {
			submission_id: "",
			error: ""
		}

		if (!post.title) {
			data.error = "missing title"
			return data
		}

		if (!post.kind) {
			data.error = "missing kind"
			return data
		}

		switch (post.kind) {
			case "link":
				if (!post.url) {
					data.error = "missing url"
					return data
				}

				r.submitLink({
					subredditName: subreddit,
					title: post.title,
					url: post.url,
				}).then((submission) => {
					data.submission_id = submission.id
				}).catch((reason) => {
					data.error = reason
				})

				return data
			case "self": 
				if (!post.text) {
					data.error = "missing text"
					return data
				}

				r.submitSelfpost({
					subredditName: subreddit,
					title: post.title,
					text: post.text
				}).then((submission) => {
					data.submission_id = submission.id
				}).catch((reason) => {
					data.error = reason
				})

				return data
			default:
				data.error = "unsupported post kind"
				return data
		}
	},
	async fetchComments(refreshToken: string, article: string): Promise<fetchCommentsReturnData> {
		const r = new Snoowrap({
			userAgent,
			clientId: REDDIT_CLIENT_ID,
			clientSecret: REDDIT_CLIENT_SECRET,
			refreshToken,
		})

		const data: fetchCommentsReturnData = {
			comments: null,
			error: ""
		}

		r.getSubmission(article).expandReplies({
			depth: 1,
		}).then((submission) => {
			data.comments = submission.comments
		}).catch((reason) => {
			data.error = reason
		})

		return data
	}
})
