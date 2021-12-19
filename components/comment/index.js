import styles from './comment.module.css';
import { convertISOToDate } from '../../utils';
import moment from 'moment';
import { useRef, useState } from 'react';
import { TextField, Grid, Select, MenuItem } from '@material-ui/core';
import { CustomButton } from '../button';
import { reportOptions } from '../../utils/constant';
import { ConfirmDialog } from '../dialog/confirm';
import { notify } from '../../utils/notify';

export const Comment = ({
    user,
    comment,
    commentRep,
    getMore,
    reply,
    setReply,
    addComment,
    isPost,
    openReport,
    setOpenReport,
    addReport,
    isAuthor,
    deleteComment,
    edit,
    setEdit,
    editComment
}) => {
    const [com, setCom] = useState('');
    const [report, setReport] = useState('');
    const [reportType, setReportType] = useState(reportOptions[0].type);
    const indexValue = 25 * comment.indexSize || 0;
    const [openConfirm, setOpenConfirm] = useState(false);
    const handleGetMore = () => {
        getMore(comment);
    };
    const [editContent, setEditContent] = useState('');
    console.log("edit", edit)

    const handleSetReply = () => {
        setReply(comment.commentId || comment.createdTime);
        setOpenReport(null);
        setEdit(null);
    };

    const handleOpenReport = () => {
        setOpenReport(comment.commentId || comment.createdTime);
        setReply(null);
        setEdit(null);
    };

    const handleEditComment = () => {
        setEditContent(comment.content)
        setEdit(comment.commentId);
        setReply(null);
        setOpenReport(null);
    };

    const handleChangeReport = (event) => {
        setReportType(event.target.value);
    };

    const handleCreateComment = async () => {
        const result = await addComment(com, comment.commentId, comment.postId, comment);
        if (result) {
            setCom('');
        }
    };

    const handleCreateReport = async () => {
        const result = await addReport(report, reportType, comment.commentId, comment.postId);
        if (result) {
            setReportType(reportOptions[0].type);
            setReport('');
            setOpenReport(null);
        }
    };

    const handleDeleteComment = async () => {
        setOpenConfirm(false);
        deleteComment(comment.commentId);
    };

    const handleEdit = async () => {
        if(editContent===''){
            notify.warn('Nhập nội dung muốn chỉnh sửa')
        } else if(editContent === comment.content) {
            notify.warn('Nhập nội dung muốn chỉnh sửa')
        } else {
            const result = await editComment(comment.commentId, editContent)
            if (result) {
                setEdit(null)
            }
        }

    }

    const inputEl = useRef(null);

    return (
        <div style={{ marginLeft: indexValue }}>
            <div className={styles.commentContainer}>
                <div className={styles.imgWapper}>
                    <img src="/avata.png" className={styles.imageCircle} />
                    <div className={styles.userNameIdWapper}>
                        <span>{user?.fullName}</span>
                        <span>{`ID: ${user?.userId}`}</span>
                    </div>
                </div>
                <div className={styles.commentWapper}>
                    <span className={`${styles.textTime}`}>
                        {comment.createdTime
                            ? convertISOToDate(moment(comment.createdTime).utcOffset('+0700'))
                            : '  '}
                    </span>
                    {commentRep ? (
                        <div className={styles.repComment}>
                            <span className={`${styles.comment} ${styles.repName}`}>
                                {commentRep.userInfo?.fullName}
                            </span>
                            <span> </span>
                            <span className={styles.comment}>{commentRep.content}</span>
                        </div>
                    ) : (
                        <></>
                    )}
                    <span className={`${styles.commentTextWapper} ${styles.comment}`}>
                        {isPost ? (
                            <div dangerouslySetInnerHTML={{ __html: comment.content }} />
                        ) : edit === comment.commentId ? (
                            <Grid container>
                                <Grid item container xs={10}>
                                    <TextField
                                        className={styles.backgroundWhite}
                                        id="outlined-multiline-flexible"
                                        label="Nhập nội dung bình luận"
                                        multiline
                                        maxRows={4}
                                        variant="outlined"
                                        value={editContent}
                                        onChange={(e) => setEditContent(e.target.value)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid
                                    item
                                    container
                                    direction="column"
                                    alignItems="flex-end"
                                    justifyContent="center"
                                    xs={2}
                                    className={styles.btnCreateCommentWapper}
                                >
                                    <CustomButton
                                        text="Xác nhận"
                                        styleNomal={true}
                                        onClick={handleEdit}
                                    />
                                </Grid>
                            </Grid>
                        ) : (
                            comment.content
                        )}
                    </span>
                    <div>
                        <span className={`${styles.reportText}`}>{''}</span>
                        {isAuthor && (
                            <>
                                <span
                                    className={styles.deleteText}
                                    onClick={() => {
                                        setOpenConfirm(true);
                                    }}
                                >
                                    Xóa
                                </span>
                                <span
                                    className={styles.editText}
                                    onClick={() => handleEditComment()}
                                >
                                    {' '}
                                    Sửa{' '}
                                </span>
                            </>
                        )}
                        {comment?.totalChildren != 0 && (
                            <span
                                className={styles.seeMoreComment}
                                onClick={() => handleGetMore()}
                            >{`Xem thêm ${comment.totalChildren} bình luận`}</span>
                        )}
                        <span className={`${styles.reportText}`} onClick={() => handleOpenReport()}>
                            Báo cáo
                        </span>
                        <span className={`${styles.replyText}`} onClick={() => handleSetReply()}>
                            Trả lời
                        </span>
                    </div>
                </div>
            </div>
            {(reply === comment.commentId || reply === comment.createdTime) && (
                <div className={styles.commentReplyWapper}>
                    {/* <input  placeholder="Nhập nội dung bình luận" /> */}
                    <TextField
                        className={styles.backgroundWhite}
                        id="outlined-multiline-flexible"
                        label="Nhập nội dung bình luận"
                        multiline
                        maxRows={4}
                        variant="outlined"
                        value={com}
                        onChange={(e) => setCom(e.target.value)}
                        ref={inputEl}
                        fullWidth
                    />
                    <div className={styles.btnCreateCommentWapper}>
                        <CustomButton
                            text="Bình luận"
                            styleNomal={true}
                            onClick={handleCreateComment}
                        />
                    </div>
                </div>
            )}
            {(openReport === comment.commentId || openReport === comment.createdTime) && (
                <Grid container className={styles.reportWapper} spacing={1}>
                    <Grid item container xs={10} spacing={1}>
                        <Grid item xs={12}>
                            <Select
                                className={styles.textFieldCreate}
                                fullWidth
                                variant="outlined"
                                value={reportType}
                                onChange={handleChangeReport}
                            >
                                {reportOptions.map((report, index) => (
                                    <MenuItem key={`report-${index}`} value={report.type}>
                                        {report.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                className={styles.backgroundWhite}
                                id="outlined-multiline-flexible"
                                label="Nhập nội dung report"
                                multiline
                                maxRows={4}
                                variant="outlined"
                                value={report}
                                onChange={(e) => setReport(e.target.value)}
                                // ref={inputEl}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <Grid
                        item
                        container
                        direction="column"
                        alignItems="flex-end"
                        justifyContent="center"
                        xs={2}
                        className={styles.btnCreateCommentWapper}
                    >
                        <CustomButton
                            text="Report"
                            styleNomal={true}
                            onClick={handleCreateReport}
                        />
                    </Grid>
                </Grid>
            )}
            <ConfirmDialog
                openDialog={openConfirm}
                setOpenDialog={setOpenConfirm}
                onConfirmed={handleDeleteComment}
                text="Xác nhận xóa bình luận"
            />
        </div>
    );
};
