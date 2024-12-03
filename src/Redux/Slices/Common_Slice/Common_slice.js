import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie'

const commonSlice = createSlice({
    name: 'common slice',
    initialState: {
        modalShow: false,
        canvasShow: false,
        isOnline: true,
        currentNavMenuIndex: 0,
        currentMenuName: '',
        innerWidth: 0,
        innerHeight: 0,
        buttonSpinner: false,
        stagesCompetedUpto: 0,

        //login states
        usernamee: '',
        passwordd: '',
        eyeOpen: false,
        eyeOpenTwo: false,
        validated: false,

        //token
        token: Cookies.get('token'),
        outboundCallToken: Cookies.get('outboundCallToken'),
        user_id: Cookies.get('user_id'),
        role: Cookies.get('role'),

        //home state
        initialGlow: false,
        getallclientsData: [],
        client_id: Cookies.get('client_id'),
        service_id: Cookies.get('service_id'),

        client_name: Cookies.get('client_name'),
        service_name: Cookies.get('service_name'),
        selected_service_progress: Cookies.get("pgs") ? JSON.parse(window.atob(Cookies.get("pgs"))) : [],

        selected_service_id: '',
        selected_service_name: '',
        selected_client_id: '',

        //layout next button
        nextButton: false,
        edited: false,
        edit_from: '',
        submitted: false,

        // for skip button
        isCompulsaryValues: false,
        isIntegrationSpecsPage: false
    },
    reducers: {
        submittedTrue(state, action) {
            return {
                ...state,
                submitted: true
            }
        },
        submittedFalse(state, action) {
            return {
                ...state,
                submitted: false
            }
        },

        selected_new_service_progress(state, action) {
            let current_pgs = [...state?.selected_service_progress]
            const pgsExists = current_pgs.includes(action.payload)
            if (!pgsExists) {
                current_pgs.push(action.payload)
                Cookies.set("pgs", window.btoa(JSON.stringify(current_pgs)))
            }
            return {
                ...state,
                selected_service_progress: current_pgs
            }
        },

        selected_new_service_progress_user_dashboard(state, action) {
            Cookies.set("pgs", window.btoa(JSON.stringify(["add_client"])))

            return {
                ...state,
                selected_service_progress: ["add_client"]
            }
        },
        selectedClient(state, action) {
            //adding paths manually
            let dynamic_progress = []
            if (action.payload?.service) {
                dynamic_progress = [...dynamic_progress, ...action.payload?.service?.user_progress]
                if (dynamic_progress.includes("add_service_details")) {
                    dynamic_progress.push("add_client")
                }

                if (dynamic_progress.includes("add_configure_flow")) {
                    dynamic_progress.push("upload_document")
                }

                //setting data in cookies
                if (action.payload?.service?.user_progress) {
                    Cookies.set("pgs", window.btoa(JSON.stringify(dynamic_progress)))
                } else {
                    Cookies.remove("pgs")
                }
            }

            return {
                ...state,
                selected_service_id: action.payload?.service?.service_id,
                selected_service_name: action.payload?.service?.service_name,
                selected_client_id: action.payload?.client_id,
                selected_service_progress: dynamic_progress
            }
        },
        resetSelectedClient(state, action) {
            Cookies.remove("pgs")

            return {
                ...state,
                selected_service_id: '',
                selected_service_name: '',
                selected_client_id: '',
                selected_service_progress: []
            }
        },
        clearingCookiesPgs(state, action) {
            Cookies.remove("pgs")

            return {
                ...state,
                selected_service_progress: []
            }
        },


        updateModalShow(state, actions) {
            return {
                ...state,
                modalShow: !state.modalShow
            }
        },
        updateCanvasShow(state, actions) {
            return {
                ...state,
                canvasShow: !state.canvasShow
            }
        },
        updateIsonline(state, action) {
            return {
                ...state,
                isOnline: action.payload
            }
        },
        updateCurrentNavMenuIndex(state, action) {
            return {
                ...state,
                currentNavMenuIndex: action.payload?.ind,
                currentMenuName: action.payload?.name,
            }
        },
        updateScreenCurrentDimension(state, action) {
            return {
                ...state,
                innerWidth: action.payload?.innerWidth,
                innerHeight: action.payload?.innerHeight
            }
        },

        //form validation
        updateValidation(state, actions) {
            return {
                ...state,
                validated: true
            }
        },
        resetValidation(state, action) {
            return {
                ...state,
                validated: false
            }
        },

        //login states
        updateLoginCredentials(state, action) {
            const type = Object.keys(action.payload)[0];
            switch (type) {
                case "username":
                    return {
                        ...state,
                        usernamee: action.payload?.username
                    }
                case "password":
                    return {
                        ...state,
                        passwordd: action.payload?.password
                    }
                default:
                    return
            }
        },
        updateEyeFunction(state, actions) {
            return {
                ...state,
                eyeOpen: !state.eyeOpen
            }
        },
        updateEyeFunctionConfirmPassword(state, action) {
            return {
                ...state,
                eyeOpenTwo: !state.eyeOpenTwo
            }
        },

        //api 
        loginRequest(state, actions) {

            return {
                ...state,
                buttonSpinner: true,
                token: null
            }
        },
        loginResponse(state, action) {
            if (action.payload) Cookies.set("token", action.payload)
            return {
                ...state,
                buttonSpinner: false,
                eyeOpen: !state.eyeOpen,
                token: action.payload
            }
        },
        updateFailure(state, action) {
            return {
                ...state,
                Err: action.payload,
                buttonSpinner: false
            }
        },


        //bearer token 
        updateToken(state, action) {
            if (action.payload) {
                Cookies.set("token", action.payload)

                return {
                    ...state,
                    token: action.payload
                }
            }
        },
        updateRemoveToken(state, actions) {
            Cookies.remove("token")
            return {
                ...state,
                token: ''
            }
        },

        updateConsumerApiToken(state, action) {
            if (action.payload) {
                Cookies.set("outboundCallToken", action.payload)

                return {
                    ...state,
                    outboundCallToken: action.payload
                }
            }
        },
        updateRemoveConsumerApiToken(state, actions) {
            Cookies.remove("outboundCallToken")
            return {
                ...state,
                outboundCallToken: ''
            }
        },


        //clearing error states
        clearError(state, actions) {
            return {
                ...state,
                Err: null
            }
        },


        //logout
        logout(state, actions) {
            Cookies.remove("token");
            Cookies.remove("user_id");
            Cookies.remove("role");
            Cookies.remove('client_id');
            Cookies.remove('service_id');
            Cookies.remove("pgs");
            Cookies.remove("client_name")
            Cookies.remove("service_name")

            return {
                ...state,
                token: '',
                usernamee: '',
                passwordd: '',
                user_id: '',
                client_id: '',
                selected_service_progress: [],
                client_name: null,
                service_name: null

            }
        },


        //get all clients
        getallclientsRequest(state, actions) {
            Cookies.remove("pgs")
            Cookies.remove('selectedConversationData')
            Cookies.remove("client_name")
            Cookies.remove("service_name")

            return {
                ...state,
                initialGlow: true,
                edit_from: '',
                selected_service_id: '',
                selected_service_name: '',
                selected_client_id: '',
                selected_service_progress: [],
                isIntegrationSpecsPage: false,
                client_name: null,
                service_name: null
            }
        },
        getallclientsResponse(state, action) {
            return {
                ...state,
                initialGlow: false,
                getallclientsData: action.payload?.data?.client_details
            }
        },

        //client id
        updateClientId(state, action) {
            console.log(action.payload?.client_id)
            if (action.payload?.client_id) {
                Cookies.set("client_id", action.payload?.client_id)
            }
            return {
                ...state,
                client_id: action.payload?.client_id
            }
        },

        updateClientName(state, action) {
            if (action.payload?.client_name) {
                Cookies.set("client_name", action.payload?.client_name)
            }
            return {
                ...state,
                client_name: action.payload?.client_name
            }
        },

        updateServiceId(state, action) {
            if (action.payload?.service_id) {
                Cookies.set("service_id", action.payload?.service_id)
            }
            return {
                ...state,
                service_id: action.payload?.service_id
            }
        },

        updateServiceName(state,action){
            if (action.payload?.service_name) {
                Cookies.set("service_name", action.payload?.service_name)
            }
            return {
                ...state,
                service_name: action.payload?.service_name
            }
        },


        //edit id
        updateEditId(state, action) {
            if (action.payload?.client_id) {
                Cookies.set("client_id", action.payload?.client_id)
            }

            if (action.payload?.client_name) {
                Cookies.set("client_name", action.payload?.client_name)
            }

            if (action.payload?.service_id) {
                Cookies.set("service_id", action.payload?.service_id)
            }

            if (action.payload?.service_name) {
                Cookies.set("service_name", action.payload?.service_name)
            }

            return {
                ...state,
                client_id: action.payload?.client_id,
                client_name: action.payload?.client_name,

                service_id: action.payload?.service_id,
                service_name: action.payload?.service_name,
            }
        },

        clearServiceDetails(state,action){
            Cookies.remove("service_id")
            Cookies.remove("service_name")

            return {
                ...state, 
                service_id: null,
                service_name: null
            }
        },


        clearEditId(state, actions) {
            Cookies.remove("client_id")
            Cookies.remove("service_id")
            Cookies.remove("client_name")
            Cookies.remove("service_name")

            return {
                ...state,
                client_id: null,
                service_id: null,
                service_name: null,
                client_name: null
            }
        },


        //layout next button
        updateNextButton(state, action) {
            return {
                ...state,
                nextButton: !state.nextButton,
                validated: !state.nextButton ? false : state.validated
            }
        },
        updateEditedTrue(state, action) {
            return {
                ...state,
                edited: true,
                edit_from: action?.payload
            }
        },
        updateEditedFalse(state, action) {
            return {
                ...state,
                edited: false,
                edit_from: ''
            }
        },

        //reset all menus
        updateResetAllMenus(state, action) {
            return {
                ...state,
                nextButton: false,
                edited: false,
                validated: false,
                modalShow: false,
                eyeOpen: false,
                eyeOpenTwo: false,
                edit_from: '',
                isIntegrationSpecsPage: false
            }
        },


        //register api
        registerRequest(state, actions) {
            return {
                ...state,
                buttonSpinner: true
            }
        },
        registerResponseAndFailure(state, actions) {

            return {
                ...state,
                buttonSpinner: false,
                usernamee: "",
                email: "",
                regPassword: "",
                confirmPassword: "",
                eyeOpen: !state.eyeOpen
            }
        },
        updateRegisterCredentials(state, actions) {
            const type = Object.keys(actions.payload)[0];
            switch (type) {
                case "email":
                    return {
                        ...state,
                        email: actions.payload?.email
                    }

                case "usernamee":
                    return {
                        ...state,
                        usernamee: actions.payload?.usernamee
                    }

                case "regPassword":
                    return {
                        ...state,
                        regPassword: actions.payload?.regPassword
                    }

                case "confirmPassword":
                    return {
                        ...state,
                        confirmPassword: actions.payload?.confirmPassword
                    }

                default:
                    return
            }
        },

        // for skip button
        handleIsCompulsaryValues(state, actions) {
            return {
                ...state,
                isCompulsaryValues: actions.payload
            }
        },

        handleIsIntegrationSpecsPage(state, actions) {

            return {
                ...state,
                isIntegrationSpecsPage: actions.payload
            }
        },
    }
})

const { actions, reducer } = commonSlice;

export const {
    updateModalShow,
    updateCanvasShow,
    updateIsonline,
    updateCurrentNavMenuIndex,
    updateScreenCurrentDimension,
    updateLoginCredentials,
    updateEyeFunction,
    updateEyeFunctionConfirmPassword,
    updateLoginError,
    clearError,

    resetValidation,
    updateValidation,

    loginRequest,
    loginResponse,
    updateFailure,
    updateToken,
    updateRemoveToken,
    logout,

    getallclientsRequest,
    getallclientsResponse,

    selected_new_service_progress,
    selected_new_service_progress_user_dashboard,
    selectedClient,
    resetSelectedClient,
    clearingCookiesPgs,
    updateClientId,
    updateClientName,
    updateServiceId,
    updateServiceName,
    clearServiceDetails,
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

    handleIsCompulsaryValues,
    handleIsIntegrationSpecsPage,

    updateConsumerApiToken,
    updateRemoveConsumerApiToken
} = actions;

export default reducer