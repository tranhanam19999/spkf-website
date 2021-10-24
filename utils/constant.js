//example data

export const post = {
    createdTime: '2021-09-04T09:35:29.478Z',
    updatedTime: '2021-09-04T09:35:29.478Z',
    authorId: 514148994,
    postId: 1630748218951,
    content: 'Noi dung bai viet 1234',
    title: 'Bai viet testing ne',
    totalViews: 0,
    totalComments: 0,
    __v: 0,
};

export const comments = [
    {
        createdTime: '2021-09-04T09:35:29.528Z',
        updatedTime: '2021-09-04T09:35:29.528Z',
        postId: 1630748218951,
        totalChildren: 2,
        content: 'Minh la con',
        commentId: 1061559013,
        authorId: 514148994,
    },
];

export const commentChilds = [
    {
        createdTime: '2021-09-04T09:37:28.372Z',
        updatedTime: '2021-09-04T09:37:28.372Z',
        postId: 1630748218951,
        parentId: 1061559013,
        totalChildren: 0,
        content: 'Minh la con',
        commentId: 1122666925,
        authorId: 514148994,
    },
    {
        createdTime: '2021-09-04T09:50:59.540Z',
        updatedTime: '2021-09-04T09:50:59.540Z',
        postId: 1630748218951,
        parentId: 1061559013,
        totalChildren: 0,
        content: 'Minh la connnnnnnn',
        commentId: 1925140578,
        authorId: 514148994,
    },
];

export const user = [
    {
        username: 'tranhanam1999',
        fullName: 'Chan Ha Lam',
        email: 'tranhanam1999@gmail.com',
        userId: 514148994,
    },
];
