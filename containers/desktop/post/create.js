import React, { useEffect } from "react";
import { MyCardHeader } from '../../../components/card';
import { Grid, TextField } from '@material-ui/core';
import styles from './post.module.css';
import { Breadcrumb } from '../../../components/breadcrumb';
import { useRouter } from 'next/router';
import { CustomButton } from '../../../components/button';
import { useState } from "react";
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import 'react-quill/dist/quill.snow.css';

export const PostCreateDesktop = (props) => {
    const router = useRouter();
    const [value, setValue] = useState('')

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
                     <ReactQuill value={value} onChange={setValue} theme="snow" />
                    </Grid>
                </Grid>
               
            </Grid>
        </div>
        
    );
};