import axios from 'axios';
import axiosInstance from '../../../services/axiosInstance';
import { toast } from "react-toastify"
import {
    updateModalShow,
    updateCanvasShow,
    updateIsonline,
    updateCurrentNavMenuIndex,
    updateScreenCurrentDimension,
    updateLoginCredentials,
    updateEyeFunction,
    updateEyeFunctionConfirmPassword,

    clearError,
    resetValidation,
    updateValidation,
    selectedClient,
    resetSelectedClient,

    loginRequest,
    loginResponse,
    updateFailure,
    updateToken,
    updateRemoveToken,
    logout,

    getallclientsRequest,
    getallclientsResponse,

    updateEditId,
    clearEditId,
    updateNextButton,
    updateEditedTrue,
    updateEditedFalse,
    updateResetAllMenus,
    submittedTrue,
    submittedFalse,

    registerRequest,
    registerResponseAndFailure,
    updateRegisterCredentials,
    selected_new_service_progress,
    updateConsumerApiToken,
    updateRemoveConsumerApiToken
} from '../../Slices/Common_Slice/Common_slice';


export const handleUpdateModalShow = (dispatch) => {
    dispatch(updateModalShow())
}

export const handleUpdateCanvasShow = (dispatch) => {
    dispatch(updateCanvasShow())
}

export const handleOnlineOffilne = (isOnline) => dispatch => {
    dispatch(updateIsonline(isOnline))
}

export const handleCurrentMenuInd = (menus, myCurrPath) => dispatch => {
    if (myCurrPath) {
        const currInd = menus.filter((v) => myCurrPath === v.route_name ? v : null)
        dispatch(updateCurrentNavMenuIndex({ ind: currInd[0]?.in, name: currInd[0]?.name }))
    } else {
        dispatch(updateCurrentNavMenuIndex({ ind: 0, name: 'Home' }))
    }
}

export const handleScreenSize = (currentSize) => (dispatch) => {
    dispatch(updateScreenCurrentDimension(currentSize))
}

export const handleLoginCredentials = (data) => (dispatch) => {
    dispatch(updateLoginCredentials(data))
}

export const handleEyeFunction = () => dispatch => {
    dispatch(updateEyeFunction())
}

export const handleEyeFunctionConfirmPassword = dispatch => {
    dispatch(updateEyeFunctionConfirmPassword())
}

export const handleClearErrors = dispatch => {
    dispatch(clearError())
}

export const handleValidation = dispatch => {
    dispatch(updateValidation())
}

export const handleResetValidation = dispatch => {
    dispatch(resetValidation())
}

// login api 
export const handleLogin = (basicAuth) => async (dispatch) => {
    try {
        dispatch(loginRequest())
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/login`,
            {
                headers: {
                    Authorization: basicAuth,
                },
            }
        );

        if (data.error_code === 200) {
            dispatch(loginResponse(data))
        } else {
            dispatch(updateFailure(data?.message))
        }
    } catch (err) {
        dispatch(updateFailure(err?.message))
    }
}

export const handleBearerToken = (token) => dispatch => {
    dispatch(updateToken(token))
}

export const handleLogout = () => dispatch => {
    dispatch(logout())
}

// get all clients api 
export const handleGetAllClients = (userId) => async (dispatch) => {
    try {
        dispatch(getallclientsRequest())
        const { data } = await axiosInstance.post("/get_all_client", { user_id: userId })

        if (data.error_code === 200) {
            dispatch(getallclientsResponse(data))
        } else {
            dispatch(updateFailure(data?.message))
        }
    } catch (err) {
        dispatch(updateFailure(err?.message))
    }
}

//card edit logic
export const handleSelectClientOption = (selectedData) => dispatch => {
    dispatch(selectedClient(selectedData))
}

export const handleResetSelectedClient = dispatch => {
    dispatch(resetSelectedClient())
}

export const handleEditClient = (selected_service_progress, menuOptions, navigate, data, addingNewService) => dispatch => {
    let selected_client = {}
    if (addingNewService) {
        selected_client = { ...addingNewService, ...data }
        const filter_particular_service = addingNewService?.services?.filter((val) => val.service_id === data.service_id)
        if (filter_particular_service?.length) {
            selected_client.service_name = filter_particular_service[0]?.service_name
        }
    }

    const rendering_tab_details_getting = menuOptions.filter((v) => selected_service_progress.includes(v?.accessable_page_name))
    if (rendering_tab_details_getting?.length) {
        const path_found = rendering_tab_details_getting[rendering_tab_details_getting.length - 1]
        navigate(path_found?.route)
        dispatch(handleCurrentMenuInd(menuOptions, path_found?.route_name))
        dispatch(updateEditId(selected_client))
    } else {
        navigate("/admin_dashboard/client_details")
        dispatch(updateEditId(data))
        dispatch(selected_new_service_progress("add_client"))
    }
}

export const handleClearEditClient = () => dispatch => {
    dispatch(clearEditId())
}


//refresh token
export const handlerefreshToken = () => async (dispatch) => {
    try {
        const { data } = await axiosInstance.get("/refresh_token")
        if (data?.error_code === 200) {
            dispatch(updateToken(data?.data?.access_token))
        } else {
            dispatch(updateRemoveToken())
        }
    } catch (err) {
        dispatch(updateFailure(err?.message))
    }
}

export const generateConsumerApiToken = () => async (dispatch) => {
    try { 

        const username = process.env.REACT_APP_CONSUMER_USERNAME;
        const password = process.env.REACT_APP_CONSUMER_PASSWORD;
        const base64Credentials = "Basic " + btoa(`${username}:${password}`);

        const { data } = await axios.get(`${process.env.REACT_APP_CONSUMER_API_URL}/gettoken`,
            {
                headers: {
                    Authorization: base64Credentials,
                },
            }
        );

        if (data.error_code === 200) {
            dispatch(updateConsumerApiToken(data.data?.token))
        } else {
            dispatch(updateFailure(data?.message))
        }
    } catch (err) {
        dispatch(updateFailure(err?.message))
    }


    // fetch(url, {
    // method: "GET",
    //     headers: {
    //         Authorization: `Basic ${base64Credentials}`,
    //     },
    // })
    //     .then((response) => {
    //         if (!response.ok) {
    //             throw new Error(`HTTP error! status: ${response.status}`);
    //         }
    //         return response.json();
    //     })
    //     .then(async (data) => {
    //         if (data.error_code === 200) {
    //             // apiToken = data.data.token;
    //             dispatch(updateConsumerApiToken(data.data))
    //         }
    //     })
    //     .catch((error) => {
    //         dispatch(updateFailure(error?.message))
    //         dispatch(updateRemoveConsumerApiToken())
    //     });
}


//next button
export const handleNextbutton = dispatch => {
    dispatch(updateNextButton())
}
export const handleEditedTrue = (editing_comp) => dispatch => {
    dispatch(updateEditedTrue(editing_comp))
}
export const handleEditedFalse = dispatch => {
    dispatch(updateEditedFalse())
}


//reset all 
export const handleResetAlMenus = dispatch => {
    dispatch(updateResetAllMenus())
}



//submit button
export const handlesubmittedTrue = dispatch => {
    dispatch(submittedTrue())
}
export const handlesubmittedFalse = dispatch => {
    dispatch(submittedFalse())
}



//register page
export const handleRegister = (registerCredentials) => async (dispatch) => {
    try {
        dispatch(registerRequest());
        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/signup`, registerCredentials);

        if (data.error_code === 200) {
            dispatch(registerResponseAndFailure())
            toast.success(data?.message)
        } else {
            dispatch(updateFailure(data?.message))
            dispatch(registerResponseAndFailure())
        }

    } catch (error) {
        dispatch(updateFailure(error?.message))
        dispatch(registerResponseAndFailure())
    }
};
export const handleRegistercredentials = (data) => (dispatch) => {
    dispatch(updateRegisterCredentials(data));
};