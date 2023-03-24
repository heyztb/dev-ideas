export type Post = {
	id?: number
	user_id: number
	title: string
	kind: "link" | "self"
	text?: string
	url?: string
	num_votes: number
	num_comments: number
	created_at: number
}