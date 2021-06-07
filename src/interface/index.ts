export interface ITagProps {
  id?: string;
  label: string;
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
}

export interface ICommentProps {
  id?: string;
  comment: string;
  dateTime?: string;
}

export interface IAboutProps {
  version: string;
  logo: string;
}

export interface IIdeaProps {
  id?: string;
  title: string;
  description: string;
  like?: boolean;
  favorites?: boolean;
  tags?: ITagProps[];
  comments?: ICommentProps[]
}

export interface IProjectProps {
  id?: string;
}
