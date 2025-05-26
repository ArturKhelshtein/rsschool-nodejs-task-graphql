export interface CreateUserArgs {
  dto: {
    name: string;
    balance: number;
  };
}

export interface ChangeUserArgs {
  id: string;
  dto: { name?: string; balance?: number };
}

export interface DeleteUserArgs {
  id: string;
}

export interface CreateProfile {
  dto: {
    isMale: boolean;
    yearOfBirth: number;
    memberTypeId: string;
    userId: string;
  };
}

export interface ChangeProfile {
  id: string;
  dto: {
    isMale?: boolean;
    yearOfBirth?: number;
    memberTypeId?: string;
    userId?: string;
  };
}

export interface DeleteProfile {
  id: string;
}

export interface CreatePost {
  dto: {
    title: string;
    content: string;
    authorId: string;
  };
}

export interface ChangePost {
  id: string;
  dto: {
    title?: string;
    content?: string;
    authorId?: string;
  };
}

export interface DeletePost {
  id: string;
}

export interface Subscribe {
  userId: string;
  authorId: string;
}

export interface Unsubscribe {
  userId: string;
  authorId: string;
}
