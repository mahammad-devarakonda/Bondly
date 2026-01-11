import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      message
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation Register($userName: String!, $email: String!, $password: String!) {
    register(userName: $userName, email: $email, password: $password) {
      message
    }
  }
`;

export const VERIFY_OTP_MUTATION = gql`
  mutation VerifyOTP($email: String!, $otp: String!) {
    verifyOTP(email: $email, otp: $otp) {
      message
      token
      user {
        id
        userName
        email
        avatar
      }
    }
  }
`;

export const GET_FEED = gql`
  query GetFeed($page: Int!, $limit: Int!) {
    feed(page: $page, limit: $limit) {
      id
      userName
      avatar
      bio
      connectionStatus
      posts {
        id
        content
        description
        imageURL
        createdAt
      }
      createdAt
    }
  }
`;

export const GET_ME = gql`
  query GetMe {
    Me {
      user {
        id
        userName
        email
        avatar
        bio
      }
      posts {
        id
        content
        imageURL
      }
    }
  }
`;
