import Auth from "./pages/Auth"
import Test from "./pages/Test"
import Profile from "./pages/Profile"
import { ADMIN_ROUTE, GRAPHIC_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE} from "./utils/consts"
import Admin from "./pages/Admin"
import Graph from "./pages/Graph"

export const adminRoutes =[
    {
        path: ADMIN_ROUTE,
        Component: <Admin></Admin>
    },
]

export const authRoutes = [
    {
        path: PROFILE_ROUTE,
        Component: <Profile></Profile>
    },
    {
        path: GRAPHIC_ROUTE,
        Component: <Graph></Graph>
    }
]

export const publicRoutes = [

    {
        path: LOGIN_ROUTE,
        Component: <Auth></Auth>
    },
    {
        path: REGISTRATION_ROUTE,
        Component: <Auth></Auth>
    },
    {
        path: MAIN_ROUTE,
        Component: <Test></Test>
    },
]