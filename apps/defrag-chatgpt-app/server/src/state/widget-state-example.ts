export interface WidgetEphemeralState {
  expandedSection?: string;
  selectedTab?: string;
  dismissedNotice?: boolean;
}

export function createWidgetEphemeralState(
  initial: Partial<WidgetEphemeralState> = {},
): WidgetEphemeralState {
  return {
    expandedSection: initial.expandedSection,
    selectedTab: initial.selectedTab ?? "summary",
    dismissedNotice: initial.dismissedNotice ?? false,
  };
}

export const WIDGET_STATE_BOUNDARY_NOTES = {
  businessStateOwner: "shared services and backend storage",
  widgetStateOwner: "inline widget instance only",
  crossSessionStateOwner: "canonical DEFRAG backend if persistence is needed later",
};

