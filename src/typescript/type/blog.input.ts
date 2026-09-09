export type BlogType = {
  title: string;
  content: string;
  category: string;
  blog_image: File | string | null;
};


export type BlogInputType={
  title: string;
  content: string
}


export type BlogoutputType = {
    _id: string;
    content: string;
    title: string;
    category: {
      _id: string
      name: string
    };
    blog_image: string;
    status: string

};

export type CategoryOutputType = {
  _id: string;
  name: string;
};
