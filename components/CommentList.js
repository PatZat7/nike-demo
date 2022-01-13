import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Slider from '@material-ui/core/Slider';
import { getCommentList, setNumPerPage, fetchComments, commentsSelector, topThreeSelector, getTopThree } from "store/slices/comments";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    root: {
        color: '#3f51b5',

    },
}));

const CommentList = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    //const commentList = useSelector(getCommentList); -- old before api
    const comments = useSelector(commentsSelector);
    const topThree = useSelector(topThreeSelector);
    const isInitialMount = useRef(true);

    useEffect(() => {
        //workaround for .then() after dispatch to ensure top three is not calculated until data is fetched
        if (isInitialMount.current) {
            dispatch(fetchComments());
            isInitialMount.current = false;
        } else {
            dispatch(getTopThree());
        }

    }, [dispatch]);

    const renderTopThree = () => {
        return topThree.map(poster => <ListItem className="TopThree">
            {poster.email}
        </ListItem>)
    }
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };


    const [value, setValue] = React.useState(30);
    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
        dispatch(setNumPerPage(newValue))
    };

    const renderComments = () => {
        let reducedList = comments.slice(0, value);
        return (


            reducedList.map(post =>
                // <ListItem>
                //     <div>
                //         <div className="flexrow">
                //             <div><h3 className="avatar">{post.email.substring(0, 2)}</h3></div>
                //             <div className="email">{post.email}</div>
                //         </div>
                //         <div>
                //             <h4 className={classes.root}>{post.name}</h4>
                //             <p className="commentBody">{post.body}</p>
                //         </div>
                //     </div>
                // </ListItem>
                <Accordion expanded={expanded === 'panel' + post.id} onChange={handleChange('panel1')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <div className="flexrow">
                            <div><h3 className="avatar">{post.email.substring(0, 2)}</h3></div>
                            <div className="email">{post.email}</div>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div>
                            <h4 className={classes.root}>{post.name}</h4>
                            <p className="commentBody">{post.body}</p>
                        </div>
                    </AccordionDetails>
                </Accordion>

            )
        )
    }
    function valuetext(value) {
        return value;
    }
    return (
        <div>
            <List color="primary" >
                <Typography variant="h3" className={classes.root}><h2>Top Commenters</h2></Typography>
                <Divider color="primary"></Divider>
                {renderTopThree()}
            </List>
            <List >
                <div className="flexrow commentTop">
                    <h2>Comments</h2>
                    <div>
                        <p>Number Of Comments to show</p>
                        <Slider
                            className="slide"
                            defaultValue={1}
                            getAriaValueText={valuetext}
                            aria-labelledby="discrete-slider-small-steps"
                            step={1}
                            marks
                            min={4}
                            max={100}
                            valueLabelDisplay="auto"
                            // value={value} 
                            onChange={handleSliderChange}
                        />
                    </div>
                </div>
                {renderComments()}
            </List>

        </div>
    );
};

export default CommentList;