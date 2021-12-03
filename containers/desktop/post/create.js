import React, { useEffect } from 'react';
import { MyCardHeader } from '../../../components/card';
import { Grid, TextField, Select, MenuItem } from '@material-ui/core';
import styles from './post.module.css';
import { Breadcrumb } from '../../../components/breadcrumb';
import { useRouter } from 'next/router';
import { CustomButton } from '../../../components/button';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createPostApi } from '../../../api/post';

const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
});

const modules = {
    toolbar: [
        [{ header: '1' }, { header: '2' }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike'],
        //   [
        //     { list: 'ordered' },
        //     { list: 'bullet' },
        //     { indent: '-1' },
        //     { indent: '+1' },
        //   ],
        //   ['link', 'image', 'video'],
        //   ['clean'],
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    },
};

const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
];

export const PostCreateDesktop = (props) => {
    const { categorys, token } = props;
    const router = useRouter();
    const [content, setContent] = useState('');
    const [cate, setCate] = useState(null);
    const [title, setTitle] = useState('');
    const { user } = useSelector((state) => state.user);
    const [isLoading, setIsloading] = useState(false);

    // const form = useForm({
    //     reValidateMode: 'onChange',
    //     defaultValues: {
    //         title: '',
    //     },
    // });

    // const { register, reset, handleSubmit, setValue, watch, formState, setError, errors } =
    // form;
    const handleCreate = async () => {
        // handleSubmit(submit)();
        console.log('value', content, title, cate);
        setIsloading(true);
        try {
            const resPost = await createPostApi(user.userId, title, cate, content, token);
            console.log('resPost', resPost);
            // if(resPost.status === 200) {
            //     router.push({
            //         pathname: '/post/detail',
            //         // query: { postId: resPost.data.data.}
            //     })
            // }
        } catch (error) {
            console.log(error.response);
        }

        setIsloading(false);
    };

    const handleChange = (event) => {
        setCate(event.target.value);
    };

    useEffect(() => {
        if (categorys.length === 0) {
            router.push('/login');
        } else {
            setCate(categorys[0].categoryId);
        }
    }, [categorys]);

    // const contern = '<p><strong>aaaaa</strong></p><p>ádasđá</p><p><br></p><p>s</p><p>a<span class="ql-size-huge">dasd dung</span></p>'

    // const handleString = (str) => {
    //     var parser = new DOMParser();
    //     var doc = parser.parseFromString(str, 'text/html');
    //     return doc.body;
    // };

    // const a = handleString(contern)

    return cate ? (
        <div className={styles.wapper}>
            <Breadcrumb route={router.asPath} detailEndpoint="Học tập" />
            <Grid container className={styles.createWapper}>
                <Grid item xs={12}>
                    <MyCardHeader title="Tạo bài viết" />
                </Grid>
                <Grid item container xs={12} className={styles.createContainer}>
                    <Grid item xs={6} style={{ paddingRight: 8 }}>
                        <span className={styles.textCreate}>Tên bài viết</span>
                        <TextField
                            // label="Tên bài viết"
                            className={styles.textFieldCreate}
                            variant="outlined"
                            multiline
                            fullWidth
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            // error={!!errors.title}
                            // inputRef={createForm.register({
                            //     required: 'Tiêu đề không được trống',
                            // })}
                            // inputRef={returnsForm.register}
                        />
                        <span className={styles.textCreate}>Nội dung bài viết</span>
                    </Grid>
                    <Grid item xs={6} style={{ paddingLeft: 8 }}>
                        <span className={styles.textCreate}>Chọn danh mục</span>
                        <Select
                            className={styles.textFieldCreate}
                            fullWidth
                            variant="outlined"
                            value={cate}
                            onChange={handleChange}
                        >
                            {categorys.map((c, i) => (
                                <MenuItem key={`cate-${i}`} value={c.categoryId}>
                                    {c.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item xs={12} className={styles.quillWapper}>
                        <ReactQuill
                            className={styles.quillStyle}
                            value={content}
                            onChange={setContent}
                            formats={formats}
                            modules={modules}
                            theme="snow"
                        />
                    </Grid>
                    <Grid item xs={12} className={styles.btnCreateWapper}>
                        <CustomButton text=" Xác nhận " styleNomal={true} onClick={handleCreate} />
                    </Grid>
                </Grid>
            </Grid>
        </div>
    ) : (
        <></>
    );
};
