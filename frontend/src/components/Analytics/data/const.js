import calendar from "../icons/caledar.png";
import noDataIcon from "../icons/nodata.png";
import upgradeButton from "../icons/upgradeButton.png";
import MapIcon from "../icons/map.png";



export { calendar, noDataIcon, upgradeButton, MapIcon };

export const baseURL = process.env.API_BASE_URL;

export const topAndBottomLinksDummy ={
  top_links: [
    {
      link_id: 1,
      link: "Tour schedule",
      total_clicks: 120,
    },
    {
      link_id: 20,
      link: "Contact me",
      total_clicks: 45,
    },
    {
      link_id: 21,
      link: "Buy my book",
      total_clicks: 111,
    },
    {
      link_id: 122,
      link: "Sign up for a class",
      total_clicks: 88,
    },
    {
      link_id: 72,
      link: "Subscribe to my mailing list",
      total_clicks: 8,
    },
  ],
  bottom_links: [
    {
      link_id: 1,
      link: "Tour schedule",
      total_clicks: 120,
    },
    {
      link_id: 20,
      link: "Contact me",
      total_clicks: 45,
    },
    {
      link_id: 21,
      link: "Buy my book",
      total_clicks: 111,
    },
    {
      link_id: 122,
      link: "Sign up for a class",
      total_clicks: 88,
    },
    {
      link_id: 72,
      link: "Subscribe to my mailing list",
      total_clicks: 8,
    },
  ],

}

export const linkDatadefault = [
  {
    link_id: 1,
    link: "Tour schedule",
    total_clicks: 120,
  },
  {
    link_id: 20,
    link: "Contact me",
    total_clicks: 45,
  },
  {
    link_id: 21,
    link: "Buy my book",
    total_clicks: 111,
  },
  {
    link_id: 122,
    link: "Sign up for a class",
    total_clicks: 88,
  },
  {
    link_id: 72,
    link: "Subscribe to my mailing list",
    total_clicks: 8,
  },
];

export const performancedata = [
  {
    name: "Daily",
    clicks: 100,
    color: "#FF6384", // Soft red
  },
  {
    name: "Weekly",
    clicks: 500,
    color: "#36A2EB", // Bright blue
  },
  {
    name: "Monthly",
    clicks: 2000,
    color: "#FFCE56", // Bright yellow
  },
];




export const defaultBarGraphData = {
  x: {
    label: "Clicks",
    data: [50, 1000, 200, 300, 400, 500, 600, 700],
  },
  y: {
    label: "Dates",
    data: ["Jan 07", "Jan 08", "Jan 28", "Jan 29", "Jan 30", "Jan 31"],
  },
};
