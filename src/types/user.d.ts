// types/user.d.ts

export interface UserProfile {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role: string;
}

export interface UpdateUserRequest {
    name?: string;
    email?: string;
    avatar?: string;
}
