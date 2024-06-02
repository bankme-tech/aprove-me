import { UserMenu } from "../../Components/UserMenu";
import {
  DashboardContext,
  DashboardProvider,
} from "./components/DashBoardContext";
import { Fab } from "./components/Fab";

export function Dashboard() {
  return (
    <DashboardProvider>
      <DashboardContext.Consumer>
        {({}) => (
          <div className="h-full w-full p-4 md:px-8 md:pb-8 md:pt-6 flex flex-col gap-4">
            <header className="h-12 flex items-center justify-end">
              <UserMenu />
            </header>

            <Fab />
          </div>
        )}
      </DashboardContext.Consumer>
    </DashboardProvider>
  );
}
