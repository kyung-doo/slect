export interface IWorkspace {
   id: number;
   name: string;
   url: string;
   OwnerId: number;
}

export interface IUser {
   id: number;
   nickname: string;
   email: string;
   Workspaces: IWorkspace[];
}

