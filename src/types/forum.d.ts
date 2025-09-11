type ThreadCategory = "NoCategory" | "QNA" | "Diskussion" | "Meddelande" | "Hitta gruppmedlem";
type TagCategory = "Arbetsmetodik" | "HTML & CSS" | "JavaScript" | "Backend" | "TypeScript" | "LIA" | "Examensarbete"; //Nytt

type ThreadCategoryType = Thread | QNAThread

type User = {
	id: number // Nytt
	userName: string;
	password: string;
}

type Thread = {
	id: number;
	title: string;
	category: ThreadCategory;
	creationDate: string;
	description: string;
	creator: User;
	// tags: ThreadTag; //Nytt
	tags: ThreadTag[]; // support multiple tags
	commentsLocked?: boolean;
}

type ThreadTag = { //Nytt
	id: number;
	tagName: TagCategory;

}

type QNAThread = Thread & { //Type extension
	category: "QNA";
	isAnswered: boolean;
	commentAnswerId?: number;
}

type ForumComment = {
	id: number;
	thread: number;
	content: string;
	creator: User;
	parentCommentId?: number, //Nytt
}
