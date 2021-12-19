import styles from './comment.module.css';
import { convertISOToDate } from '../../utils';
import moment from 'moment';
import { useRef, useState } from 'react';
import { TextField, Grid, Select, MenuItem } from '@material-ui/core';
import { CustomButton } from '../button';
import { reportOptions } from '../../utils/constant';

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
    addReport
}) => {
    const [com, setCom] = useState('');
    const [report, setReport] = useState('');
    const [reportType, setReportType] = useState(reportOptions[0].type);
    const indexValue = 25 * comment.indexSize || 0;
    const handleGetMore = () => {
        getMore(comment);
    };

    const handleSetReply = () => {
        setReply(comment.commentId || comment.createdTime);
        setOpenReport && setOpenReport(false);
    };

    const handleOpenReport = () => {
        setOpenReport(!openReport);
        setReply(null);
    };

    const handleChangeReport = (event) => {
        setReportType(event.target.value);
    };

    const handleCreateComment = async () => {
        const result = await addComment(com, comment.commentId, comment.postId);
        if (result) {
            setCom('');
        }
    };

    const handleCreateReport = async () => {
        const result = await addReport(report, reportType)
        if (result) {
            setReportType(reportOptions[0].type)
            setReport('')
            setOpenReport(false)
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
                        ) : (
                            comment.content
                        )}
                    </span>
                    <div>
                        <span className={`${styles.reportText}`}>{''}</span>
                        {comment?.totalChildren != 0 && (
                            <span
                                className={styles.seeMoreComment}
                                onClick={() => handleGetMore()}
                            >{`See more ${comment.totalChildren} comment`}</span>
                        )}
                        {isPost && (
                            <span
                                className={`${styles.reportText}`}
                                onClick={() => handleOpenReport()}
                            >
                                Report
                            </span>
                        )}
                        <span className={`${styles.replyText}`} onClick={() => handleSetReply()}>
                            Reply
                        </span>
                    </div>
                </div>
            </div>
            {(reply === comment.commentId || reply === comment.createdTime) &&
                (!isPost || !openReport) && (
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
            {isPost && openReport && (
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
        </div>
    );
};
