import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Register } from './register/register';
import { VerifyOtp } from './verify-otp/verify-otp';
import { Contests } from './contests/contests';
import { OnlineTest } from './online-test/online-test';
import { PerfomanceComp } from './perfomance/perfomance';
import { ContestForm } from './contestForm/contest';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard';


export const routes: Routes = [
    {
        path: 'login',
        component: Login
    }, {
        path: 'register',
        component: Register
    }, {
        path: 'verifyOtp',
        component: VerifyOtp
    },
    {
        path: 'contest',
        component: Contests
    }, {
        path: 'contest/:id',
        component: OnlineTest
    },
    {
        path: 'perfomance',
        component: PerfomanceComp
    },
    {
        path : 'contestForm',
        component : ContestForm
    },{
        path : 'admin-dashboard',
        component : AdminDashboardComponent
    }
];
