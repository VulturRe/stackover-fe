export interface IResponse<T> {
  has_more: boolean;
  quota_max: number;
  quota_remaining: number;
  items: Array<T>;
}

export interface IQuestion {
  accepted_answer_id?: number;
  answer_count: number;
  body: string;
  creation_date: Date;
  is_answered: boolean;
  last_activity_date: Date;
  link: string;
  owner?: IShallowUser;
  question_id: number;
  score: number;
  tags: Array<string>;
  title: string;
  view_count: number;
}

export interface IAnswer {
  answer_id: number;
  body: string;
  community_owned_date?: Date;
  creation_date: Date;
  is_accepted: boolean;
  last_activity_date: Date;
  last_edit_date?: Date;
  locked_date?: Date;
  owner?: IShallowUser;
  question_id: number;
  score: number;
}

export interface IShallowUser {
  accept_rate?: number;
  display_name?: string;
  link?: string;
  profile_image?: string;
  reputation?: number;
  user_id?: number;
  user_type: 'unregistered' | 'registered' | 'moderator' | 'team_admin' | 'or does_not_exist';
}
