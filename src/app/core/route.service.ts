import { Routes } from '@angular/router';
import { ShellComponent } from './shell/shell.component';
import { AuthenticationGuard } from './authentication/authentication.guard';

export class Route {
    static withShell(routes: Routes): Routes {
        return [
            { path: '', canActivate: [AuthenticationGuard], component: ShellComponent, children: routes, data: { reuse: true } }
        ];
    }
}
