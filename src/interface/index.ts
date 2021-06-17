export interface ITagProps {
  id?: string;
  title: string;
  show?: boolean;
  select?: boolean;
  sort?: number;
}

export interface IPersonalProps {
  id?: string;
  name: string;
  avatar?: string;
  phone?: string;
  email?: string;
  password?: string;
  homePage?: string;
  description?: string;
  showId?: string;
  createTime?: string;
}

export interface ICommentProps {
  id?: string;
  title: string;
  createTime?: string;
  personal?: IPersonalProps;
  user?: IPersonalProps;
}

export interface IAboutProps {
  version: string;
  logo: string;
}

export interface IIdeaProps {
  id?: string;
  createTime?: string;
  title: string;
  content: string;
  isLike?: boolean;
  isStar?: boolean;
  link?: string;
  initiator?: IPersonalProps;
  times?: {
    view?: number;
    like?: number;
    star?: number;
    comment?: number;
    share?: number;
  };
  private?: {
    type?: string,
    time?: string,
  },
  plan?: {
    startTime: string,
    endTime: string,
  },
  tags?: ITagProps[];
}

export interface IProjectProps {
  id?: string;
  title: string;
  content: string;
  createTime?: string;
}
