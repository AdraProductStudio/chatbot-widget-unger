import React, { useEffect, useState } from 'react'
import ButtonComponent from '../Button/Button'
import SpinnerComponent from '../Spinner/Spinner'
import { Form, Row } from 'react-bootstrap'
import InputGroup from '../Input/InputGroup'
import { useSelector } from 'react-redux'
import { useDispatch } from '../CustomHooks'
import sha256 from 'sha256';
import { handleEyeFunction, handleEyeFunctionConfirmPassword, handleRegister, handleRegistercredentials, handleResetAlMenus } from '../../Redux/Actions/Common_actions/Common_action'

const SignupForm = () => {
    const { email, usernamee, regPassword, confirmPassword, eyeOpen, eyeOpenTwo, buttonSpinner } = useSelector((state) => state.commonState)
    const dispatch = useDispatch();

    const [errMessage, setErrMessege] = useState({
        emailErr: "",
        usernameErr: "",
        passwordErr: "",
        confirmPasswordErr: "",
    });

    const [showError, setShowError] = useState({
        emailErr: false,
        usernameErr: false,
        passwordErr: false,
        confirmPasswordErr: false,
    });

    useEffect(() => {
        dispatch(handleResetAlMenus)
    }, [])

    const handleRegisterSubmit = () => {
        dispatch(handleRegister({ username: usernamee, password: sha256(regPassword), email_id: email }));
    };

    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const validatePassword = (password) => {
        const minLengthCheck = password.length >= 6;
        const uppercaseCheck = /[A-Z]/.test(password);
        const specialCharCheck = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        return minLengthCheck && uppercaseCheck && specialCharCheck;
    };

    const validateConfirmPassword = (confirmPassword, regPassword) => {
        return confirmPassword === regPassword;
    };

    const handleBlur = (value) => {
        if (value === "email") {
            if (!email) {
                setShowError({
                    ...showError,
                    emailErr: true,
                });
                setErrMessege({
                    ...errMessage,
                    emailErr: "Email is required",
                });
            } else if (!validateEmail(email)) {
                setShowError({
                    ...showError,
                    emailErr: true,
                });
                setErrMessege({
                    ...errMessage,
                    emailErr: "Please Enter valid Email",
                });
            } else {
                setShowError({
                    ...showError,
                    emailErr: false,
                });
                setErrMessege({
                    ...errMessage,
                    emailErr: "",
                });
            }
        } else if (value === "regPassword") {
            if (!regPassword) {
                setShowError({
                    ...showError,
                    passwordErr: true,
                });
                setErrMessege({
                    ...errMessage,
                    passwordErr: "Password is required",
                });
            } else if (!validatePassword(regPassword)) {
                setShowError({
                    ...showError,
                    passwordErr: true,
                });
                setErrMessege({
                    ...errMessage,
                    passwordErr:
                        "Password must be at least 6 characters & contain at least one uppercase & one special character",
                });
            } else {
                setShowError({
                    ...showError,
                    passwordErr: false,
                });
                setErrMessege({
                    ...errMessage,
                    passwordErr: "",
                });
            }
        } else if (value === "confirmPassword") {
            if (!confirmPassword) {
                setShowError({
                    ...showError,
                    confirmPasswordErr: true,
                });
                setErrMessege({
                    ...errMessage,
                    confirmPasswordErr: "Password is required",
                });
            } else if (!validateConfirmPassword(confirmPassword, regPassword)) {
                setShowError({
                    ...showError,
                    confirmPasswordErr: true,
                });
                setErrMessege({
                    ...errMessage,
                    confirmPasswordErr: "Passwords do not match",
                });
            } else {
                setShowError({
                    ...showError,
                    confirmPasswordErr: false,
                });
                setErrMessege({
                    ...errMessage,
                    confirmPasswordErr: "",
                });
            }
        } else {
            if (!usernamee) {
                setShowError({
                    ...showError,
                    usernameErr: true,
                });
                setErrMessege({
                    ...errMessage,
                    usernameErr: "user name is required",
                });
            }
        }
    };

    return (
        <Form>
            <Row className="mb-3">
                <InputGroup
                    gropuClassName="col-12 py-2 mb-2"
                    inputHeading="Username"
                    inputType="text"
                    placeholder="Username"
                    change={(e) =>
                        dispatch(handleRegistercredentials({ username: e.target.value }))
                    }
                    value={usernamee}
                    handleBlur={() => handleBlur("username")}
                />
                {showError.usernameErr ? (
                    <span className="text-danger">{errMessage.usernameErr}</span>
                ) : null}


                <InputGroup
                    gropuClassName="col-12 py-2 mb-2"
                    inputHeading="Email ID"
                    inputType="email"
                    placeholder="Email ID"
                    change={(e) =>
                        dispatch(handleRegistercredentials({ email: e.target.value }))
                    }
                    value={email}
                    handleBlur={() => handleBlur("email")}
                />
                {showError.emailErr ? (
                    <span className="text-danger">{errMessage.emailErr}</span>
                ) : null}

                <InputGroup
                    gropuClassName="col-12 py-2 mb-2"
                    inputHeading="Password"
                    inputType="password"
                    placeholder="Password"
                    change={(e) =>
                        dispatch(handleRegistercredentials({ regPassword: e.target.value }))
                    }
                    value={regPassword}
                    eyeState={!eyeOpen}
                    eyeFunctionClick={() => dispatch(handleEyeFunction())}
                    handleBlur={() => handleBlur("regPassword")}
                />

                {showError.passwordErr ? (
                    <span className="text-danger">{errMessage.passwordErr}</span>
                ) : null}

                <InputGroup
                    gropuClassName="col-12 py-2 mb-2"
                    inputHeading="Confirm Password"
                    inputType="password"
                    placeholder="Confirm Password"
                    change={(e) =>
                        dispatch(
                            handleRegistercredentials({ confirmPassword: e.target.value })
                        )
                    }
                    value={confirmPassword}
                    eyeState={!eyeOpenTwo}
                    eyeFunctionClick={() => dispatch(handleEyeFunctionConfirmPassword)}
                    handleBlur={() => handleBlur("confirmPassword")}
                />

                {showError.confirmPasswordErr ? (
                    <span className="text-danger">{errMessage.confirmPasswordErr}</span>
                ) : null}
            </Row>

            <ButtonComponent
                type="submit"
                className="btn-md w-100 mb-3"
                title="Sign Up"
                buttonName={buttonSpinner ?
                    <SpinnerComponent />
                    :
                    "Sign Up"
                }
                btnDisable={buttonSpinner}
                clickFunction={handleRegisterSubmit}
            />
        </Form>
    )
}

export default SignupForm