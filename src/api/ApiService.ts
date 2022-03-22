import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Post } from '../types/post';
import { ProfileData } from '../types/profile';
import { User } from '../types/user';

type CreatePostData = {
  title: string;
  body: string;
  token: string;
};

type LoginData = {
  username: string;
  password: string;
};

type SignUpData = {
  username: string;
  email: string;
  password: string;
};

type UserProfileData = {
  token: string;
};

type EditPostData = {
  title: string;
  body: string;
  token: string;
};

export class ApiService {
  static baseURL = 'http://localhost:8080';

  static async login(data: LoginData): Promise<AxiosResponse<User>> {
    const response = await axios.post<User>('/login', {
      username: data.username,
      password: data.password,
    });
    return response;
  }

  static async createPost(
    data: CreatePostData
  ): Promise<AxiosResponse<string>> {
    const response = await axios.post<string>('/create-post', {
      title: data.title,
      body: data.body,
      token: data.token,
    });
    return response;
  }

  static async signup(data: SignUpData) {
    await axios.post('/register', {
      username: data.username,
      email: data.email,
      password: data.password,
    });
  }

  static async fetchPost(
    id: string | undefined,
    config: AxiosRequestConfig
  ): Promise<AxiosResponse<Post>> {
    const response = await axios.get<Post>(`/post/${id}`, config);
    return response;
  }

  static async fetchUserProfile(
    username: string | undefined,
    data: UserProfileData,
    config: AxiosRequestConfig
  ): Promise<AxiosResponse<ProfileData>> {
    const response = await axios.post<ProfileData>(
      `/profile/${username}`,
      {
        token: data.token,
      },
      config
    );
    return response;
  }

  static async editPost(
    id: string,
    data: EditPostData,
    config: AxiosRequestConfig
  ): Promise<AxiosResponse<Post>> {
    const response = await axios.post<Post>(
      `post/${id}/edit`,
      {
        title: data.title,
        body: data.body,
        token: data.token,
      },
      config
    );
    return response;
  }

  static async fetchProfilePosts(
    username: string | undefined,
    config: AxiosRequestConfig
  ): Promise<AxiosResponse<Post[]>> {
    const response = await axios.get<Post[]>(
      `/profile/${username}/posts`,
      config
    );
    return response;
  }
}