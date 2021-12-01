import React, { useEffect } from 'react';
import { MyCardHeader } from '../../../components/card';
import { Grid, TextField } from '@material-ui/core';
import styles from './post.module.css';
import { Breadcrumb } from '../../../components/breadcrumb';
import { useRouter } from 'next/router';
import { CustomButton } from '../../../components/button';
import { useState } from 'react';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
});
import 'react-quill/dist/quill.snow.css';

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
    const router = useRouter();
    const [value, setValue] = useState('');

    const handleSubmit = () => {
        console.log("value",value, typeof value)
    }
    
    const contern = '<p><strong>aaaaa</strong></p><p>ádasđá</p><p><br></p><p>s</p><p>a<span class="ql-size-huge">dasd dung</span></p>'

    const handleString = (str) => {
        var parser = new DOMParser();
        var doc = parser.parseFromString(str, 'text/html');
        return doc.body;
    };

    const a = handleString(contern)

    return (
        <div className={styles.wapper}>
            <Breadcrumb route={router.asPath} detailEndpoint="Học tập" />
            <Grid container className={styles.createWapper}>
                <Grid item xs={12}>
                    <MyCardHeader title="Tạo bài viết" />
                </Grid>
                <Grid item container xs={12} className={styles.createContainer}>
                    <Grid item xs={12}>
                        <span className={styles.textCreate}>Tên bài viết</span>
                        <TextField
                            // label="Tên bài viết"
                            variant="outlined"
                            multiline
                            fullWidth
                            className={styles.textFieldCreate}
                        />
                        <span className={styles.textCreate}>Nội dung bài viết</span>
                    </Grid>
                    <Grid item xs={12} className={styles.quillWapper}>
                        <ReactQuill
                            className={styles.quillStyle}
                            value={value}
                            onChange={setValue}
                            formats={formats}
                            modules={modules}
                            theme="snow"
                        />
                    </Grid>
                    <Grid  item xs={12}>
                    <div className={styles.btnCreate}>
                        <CustomButton
                            text="Tạo bài viết &#43;"
                            styleNomal={true}
                            onClick={handleSubmit}
                        />
                    </div>
                    </Grid>
                    <div dangerouslySetInnerHTML={{ __html: contern }} />
                </Grid>
            </Grid>
        </div>
    );
};
