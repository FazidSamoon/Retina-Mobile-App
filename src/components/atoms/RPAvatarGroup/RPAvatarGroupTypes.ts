export type RPAvatarGroupProps = {
  avatars: SingleAvatarType[];
  size: "small" | "medium" | "large";
  max: number;
  containerStyle?: object;
  titleStyle?: object;
};

export type SingleAvatarType = {
  uri: string;
  title: string;
};

export const dummyAvatar = [
    {
        uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
        title: "RP"
    },
    {
        uri: null,
        title: "RS"
    },
    {
        uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
        title: "RP"
    },
    {
        uri: null,
        title: "RT"
    },
    {
        uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
        title: "RP"
    },
    {
        uri: null,
        title: "RQ"
    },
    {
        uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
        title: "RP"
    },
    {
        uri: null,
        title: "RA"
    },
    {
        uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
        title: "RP"
    }
]