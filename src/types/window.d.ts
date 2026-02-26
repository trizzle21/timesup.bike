// Type declarations for custom window properties

interface Window {
	__BUILD_TIME_DATA__?: any;
	__DEPLOY_ID__?: string;
	fetchAndRenderCharts?: (forceRefresh?: boolean) => Promise<void>;
}
