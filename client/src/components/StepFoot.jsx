import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import {toast} from "react-toastify";

export default function StepFoot({
    activeStep,
    handleBack,
    handleNext,
    steps,
    sendToServer,
}) {
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                pt: 2,
                borderRadius: "8px",
                marginTop: "10px",
            }}
        >
            <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{
                    mr: 1,
                    borderRadius: "8px",
                    border: "1px solid",
                    borderColor: activeStep === 0 ? "rgba(0,0,0,0.23)" : "#000000",
                    padding: "5px 32px",
                }}
            >
                Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />

            {activeStep !== steps.length - 1 && (
                <Button
                    onClick={handleNext}
                    sx={{
                        background: "#2F7EC7",
                        borderRadius: "8px",
                        padding: "5px 32px",
                        color: "#fff",
                        fontWeight: "500",
                        "&:hover": {
                            background:
                                activeStep === steps.length - 1 ? "#38ba6c" : "#4295e2",
                        },
                    }}
                >
                    Next
                </Button>
            )}
            {activeStep === steps.length-1 && (
                <div>
                    <Button sx={{background:"#38ba6c","&:hover":{background:'#38ba6c'}}} variant="contained" onClick={toggle}>
                        Submit Form
                    </Button>
                    <Modal isOpen={modal} toggle={toggle}>
                        <ModalBody>
                            <div style={{ fontSize: "1.4rem", fontWeight: 700 }}>
                                Are you sure you want to submit the form?
                            </div>
                            <div>Once you submit you will not be able to edit the form</div>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                sx={{ margin: "0 1rem" }}
                                variant="contained"
                                color="success"
                                onClick={() => {
                                    sendToServer();
                                    toggle();
                                    toast.success("Complete Form Submitted!", {
                                        position: "top-center",
                                        autoClose: 5000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        theme: "light",
                                    });
                                }}
                            >
                                Submit
                            </Button>{" "}
                            <Button variant="contained" color="error" onClick={toggle}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Modal>
                </div>
            )}
        </Box>
    );
}
