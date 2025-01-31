import { Button } from "@mui/material";
import { DashboardLayoutSlots } from "@toolpad/core";
import SettingsIcon from '@mui/icons-material/Settings';

/**
 * Dashboard Layout Slots
 */
export const dashboardSlots: DashboardLayoutSlots = {
    sidebarFooter: () => <div className="flex h-16">
        <div className="m-auto ml-2">
            <Button color="inherit" sx={{ minWidth: 0 }} href="/settings">
                <SettingsIcon />
            </Button>
        </div>
    </div>
}
