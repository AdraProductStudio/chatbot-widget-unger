import { useSelector } from 'react-redux';
import Icons from './Icons';
import { useDispatch } from '../components/CustomHooks';


const JsonData = () => {
    //main selectors
    const dispatch = useDispatch();
    const { validated, edited,role } = useSelector((state) => state.commonState);

    const jsonOnly = {
        //service details
        serviceNames: [
            {
                id: 1,
                value: "Customer Service Agent",
                label: 'Customer Service Agent'
            },
            {
                id: 2,
                value: "Executive Assistant",
                label: 'Executive Assistant'
            },
            {
                id: 3,
                value: "Sales Assistant",
                label: 'Sales Assistant'
            },
            {
                id: 4,
                value: "Sales Knowledge Worker",
                label: 'Sales Knowledge Worker'
            },
            {
                id: 4,
                value: "Custom Service",
                label: 'Custom Service'
            }
        ],

        serviceObjectives: [
            {
                type: "checkbox",
                label_name: "Schedule an appoinment",
            },
            {
                type: "checkbox",
                label_name: "Qualify a consumer",
            },
            {
                type: "checkbox",
                label_name: "Qualify and transfer call to an agent",
            },
            {
                type: "checkbox",
                label_name: "Give a product recommendation",
            },
            {
                type: "checkbox",
                label_name: "Answer common queries/FAQs",
            },
            {
                type: "checkbox",
                label_name: "Answer relevant product questions from product documentation",
            }
        ],
        engagementType: [
            {
                type: 'radio',
                label_name: 'Chatbot',
                name: 'radio'
            },
            {
                type: 'radio',
                label_name: 'AI Voice call',
                name: 'radio'
            }
        ],
        typeOfCall: [
            {
                type: 'radio',
                label_name: 'Inbound',
                name: 'radio'
            },
            {
                type: 'radio',
                label_name: 'Outbound',
                name: 'radio'
            }
        ],
        inboundData: [
            {
                type: 'radio',
                label_name: 'No',
                name: 'radio'
            },
            {
                type: 'radio',
                label_name: 'Yes',
                name: 'radio'
            }
        ],
        OutboundData: [
            {
                type: 'radio',
                label_name: 'Share list with Phone No & Schedule',
                name: 'radio'
            },
            {
                type: 'radio',
                label_name: 'Access MR Outbound call API',
                name: 'radio'
            }
        ],
        voiceAgent: [
            {
                type: 'radio',
                label_name: 'Male',
                name: 'radio'
            },
            {
                type: 'radio',
                label_name: 'Female',
                name: 'radio'
            }
        ],
        paceOfAgent: [
            {
                type: 'radio',
                label_name: 'Slow',
                name: 'radio'
            },
            {
                type: 'radio',
                label_name: 'Medium',
                name: 'radio'
            },
            {
                type: 'radio',
                label_name: 'Fast',
                name: 'radio'
            }


            // {
            //     type: 'radio',
            //     label_name: 'Business/Formal',
            //     name: 'radio'
            // },
            // {
            //     type: 'radio',
            //     label_name: 'Urgent',
            //     name: 'radio'
            // },
            // {
            //     type: 'radio',
            //     label_name: 'Kind',
            //     name: 'radio'
            // },
            // {
            //     type: 'radio',
            //     label_name: 'Compassionate',
            //     name: 'radio'
            // }
        ],
        toneVoiceAgent: [
            {
                type: 'radio',
                label_name: 'Slow',
                name: 'radio'
            },
            {
                type: 'radio',
                label_name: 'Medium',
                name: 'radio'
            },
            {
                type: 'radio',
                label_name: 'Fast',
                name: 'radio'
            }
        ],


        //upload catalog
        uploadSections_1: [
            {
                title: "Catalog Upload:",
                file_category: "catalog",
                description: "The product list is essential to Model Rocket's AI automation. Using the data you provide, we will analyze and predict criteria and flows, influencing key human behavior during customer purchase cycles.",
            },
            {
                title: "Upload Marketing Material",
                file_category: "marketing material",
                description: "Marketing data is critical to the Model Rocket AI process. This data provides important insights such as positioning, descriptions, intended use, materials, ideal customer, messaging, categories, reviews, social media comments, and more.",
            },
        ],
        uploadSections_2: [
            {
                title: "FAQs",
                file_category: "faq",
                description: "Data on FAQs ensures that the common queries that consumers have which usually, represents 50-80% of consumer queries can be answered by MR's AI agent.",
            },
            {
                title: "Knowledge Documents",
                file_category: "Knowledge doc",
                description: "Our agent is designed to efficiently use the knowledge provided by our clients to answer consumer questions about specific product/services or any general questions they might have. The more knowledge about your products/services we get access to, the better we can engage with the consumers and help you with sales and consumer service.",
            },
            {
                title: "Indexed links to help content",
                file_category: "index links",
                description: "Give us links and tags to your datasheets, videos, and any other resources you might have on different platforms. This will help us redirect consumers to such resources to help them better answer their questions.",
            },
        ]
    }

    const jsxJson = {
        menuOptions: [
            {
                icon: Icons.clientDetailsIcon,
                name: "Client Details",
                route: role==="user" ? "/user_dashboard/client_details" : "/admin_dashboard/client_details",
                route_name: "client_details",
                accessable_page_name: "add_client",
                in: 0,
            },
            {
                icon: Icons.serviceDetailsIcon,
                name: "Service Details",
                route: role==="user" ? "/user_dashboard/service_details" : "/admin_dashboard/service_details",
                route_name: "service_details",
                accessable_page_name: "add_service_details",
                in: 1
            },
            {
                icon: Icons.uploadCatlogIcon,
                name: "Upload Catalog",
                route: role==="user" ? "/user_dashboard/upload_catalog" : "/admin_dashboard/upload_catalog",
                route_name: "upload_catalog",
                accessable_page_name: "upload_document",
                in: 2
            },
            {
                icon: Icons.determineCriteriaIcon,
                name: "Determine Criteria",
                route: role==="user" ? "/user_dashboard/determine_criteria" : "/admin_dashboard/determine_criteria",
                route_name: "determine_criteria",
                accessable_page_name: "edit_determine_criteria",
                in: 3
            },
            {
                icon: Icons.configureFlowIcon,
                name: "Configure Flow",
                route: role==="user" ? "/user_dashboard/configure_flow" : "/admin_dashboard/configure_flow",
                route_name: "configure_flow",
                accessable_page_name: "add_configure_flow",
                in: 4
            },
            {
                icon: Icons.integrationSpecsIcon,
                name: "Integration Specs",
                route: role==="user" ? "/user_dashboard/integration_specs" : "/admin_dashboard/integration_specs",
                route_name: "integration_specs",
                accessable_page_name: "add_integration_specs",
                in: 5
            },
            {
                icon: Icons.reportsIcon,
                name: "Reports",
                route: role==="user" ? "/user_dashboard/reports" : "/admin_dashboard/reports",
                route_name: "reports",
                accessable_page_name: "add_report",
                in: 6
            },
            {
                icon: Icons.previewIcon,
                name: "Preview",
                route: role==="user" ? "/user_dashboard/preview" : "/admin_dashboard/preview",
                route_name: "preview",
                accessable_page_name: "review_and_submit",
                in: 7
            },
            {
                icon: Icons.sandboxIcon,
                name: "Sandbox",
                route: role==="user" ? "/user_dashboard/sandbox" : "/admin_dashboard/sandbox",
                route_name: "sandbox",
                accessable_page_name: "chatbot_widget",
                in: 8
            },

        ],
        clientMenuOptions: [
            {
                icon: Icons.dashboardIcon,
                name: "Sandbox",
                route: "",
            },
            {
                icon: Icons.logoutLocon,
                name: "Sign out",
                route: "/"
            },
        ],
        adminDashboardSidebarOptions: [
            {
                icon: Icons.homeIcon,
                name: "Home",
                route: "/admin_dashboard/home",
                route_name: "home",
                in: 0,
            },
            {
                icon: Icons.transcriptSummaryIcon,
                name: "Call Details",
                route: "/admin_dashboard/call_details",
                route_name: "call_details",
                in: 1
            },
        ]
    }

    return {
        "jsonOnly": jsonOnly,
        "jsxJson": jsxJson
    }
}

export default JsonData