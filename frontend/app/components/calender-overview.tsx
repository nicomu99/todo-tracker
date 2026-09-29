import { useState } from "react";
import { startOfWeek, addDays, isSameDay } from "date-fns";
import DashboardCard from "./ui/dashboard-card";
import CalenderDay from "@/components/ui/calender-day";
import CardIcon from "@/components/ui/card-icon";
import CardTitle from "@/components/ui/card-title";
import CalenderIcon from "@/icons/calender-icon";
import ChevronBackwardIcon from "@/icons/chevron-backward";
import ChevronForwardIcon from "@/icons/chevron-forward-icon";
import { CalenderChevronButton } from "@/components/ui/calender-chevron-button";
import { CalenderOverviewDayView } from "@/components/ui/calender-overview-day-view";

export default function CalenderOverview() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
    const days = Array.from({ length: 7 }, (_, i) =>
        addDays(weekStart, i),
    );

    const updateWeek = (deltaWeeks: number) => {
        const resultDate = addDays(currentDate, deltaWeeks * 7);
        setCurrentDate(resultDate);
    };

    return (
        <DashboardCard>
            <div className="flex flex-row items-center gap-8 mb-4">
                <CardIcon>
                    <CalenderIcon/>
                </CardIcon>
                <CardTitle>
                    Calendar
                </CardTitle>
                <div className="ml-auto mr-4">
                    {currentDate.toLocaleDateString("en-US", {
                        "month": "long",
                    })}
                </div>
            </div>
            <div>
                <div className="grid items-center grid-cols-[repeat(auto-fit,minmax(50px,1fr))] gap-2 md:gap-6">
                    <CalenderChevronButton onSelect={() => updateWeek(-1)}>
                        <ChevronBackwardIcon/>
                    </CalenderChevronButton>
                    {days.map(day => (
                        <CalenderDay
                            key={day.toISOString()}
                            date={day}
                            active={isSameDay(currentDate, day)}
                            onSelect={setCurrentDate}
                        />
                    ))}
                    <CalenderChevronButton onSelect={() => updateWeek(1)}>
                        <ChevronForwardIcon/>
                    </CalenderChevronButton>
                </div>
                <div></div>
                <CalenderOverviewDayView date={currentDate} />
            </div>
        </DashboardCard>
    );
}