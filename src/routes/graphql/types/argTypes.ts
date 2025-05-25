export interface CreateUserArgs {
  name: string;
  balance: number;
}

export interface UpdateUserArgs {
  id: string;
  name?: string;
  balance?: number;
}

export interface DeleteUserArgs {
  id: string;
}

export interface CreateProfile {
    isMale: boolean;
    yearOfBirth: number;
    memberTypeId: string;
    userId: string;
}

export interface UpdateProfile {
    id: string;
    isMale?: boolean;
    yearOfBirth?: number;
    memberTypeId?: string;
    userId?: string;
}

export interface DeleteProfile {
    id: string;
}

export interface CreatePost {
    title: string;
    content: string;
    authorId: string;
}

export interface UpdatePost {
    id: string;
    title?: string;
    content?: string;
    authorId?: string;
}

export interface DeletePost {
    id: string;
}