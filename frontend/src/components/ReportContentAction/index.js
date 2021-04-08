import React, { useState } from 'react';
import {
    Modal,
    Form,
    TextArea,
    Button,
    Icon
} from 'semantic-ui-react';

const ReportContentAction = () => {
    const [openCommentReportForm, setOpenCommentReportForm] = useState(false);
    const [reportTextErrors, setReportTextErrors] = useState(false);
    const [reportText, setReportText] = useState("");

    const submitReport = () => {
        if(reportText.length > 0) {
            // TODO: submit the report
            setOpenCommentReportForm(false);
            setReportTextErrors(false);
        } else {
            setReportTextErrors(true);
        }
    }

    return (
        <>
            <a onClick={() => setOpenCommentReportForm(true)}><Icon name="flag outline" /> Report </a>
            <Modal
                onClose={() => setOpenCommentReportForm(false)}
                onOpen={() => setOpenCommentReportForm(true)}
                open={openCommentReportForm}
                size="tiny"
            >
                <Modal.Content>
                    <Modal.Description>
                        <h1>Report Content</h1>
                        <Form>
                            <Form.Field
                                control={TextArea}
                                placeholder="Please provide as many details as you can"
                                name="description"
                                label="What is the reason for reporting this content?"
                                value={reportText}
                                error={reportTextErrors}
                                onChange={(e) => setReportText(e.target.value)}
                            />
                        </Form>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        content="Cancel"
                        onClick={() => setOpenCommentReportForm(false)}
                    />
                    <Button
                        content="Report!"
                        onClick={() => submitReport()}
                        color="yellow"
                    />
                </Modal.Actions>
            </Modal>
        </>
    );
}

export default ReportContentAction;