export const clubsData = [
  { id: 1, name: "IMG (Info Mgmt Group)", unread: 2, isAdmin: true },
  { id: 2, name: "SDS (Software Dev Section)", unread: 0, isAdmin: true },
  { id: 3, name: "PAG (Programming & Algo Group)", unread: 5, isAdmin: false },
  { id: 4, name: "CulSoc", unread: 0, isAdmin: false },
  { id: 5, name: "UBA", unread: 1, isAdmin: false },
];

export const initialNotices = [
  {
    id: 1,
    clubId: 1,
    sender: "Admin",
    content: "Recruitment drive starts tomorrow at LHC!",
    file: "poster.pdf",
    timestamp: "2023-10-24 10:30 AM",
  },
  {
    id: 2,
    clubId: 1,
    sender: "Admin",
    content: "Please update your profiles on the intranet.",
    file: null,
    timestamp: "2023-10-25 02:15 PM",
  },
  {
    id: 3,
    clubId: 3,
    sender: "Admin",
    content: "Cook-off results are out.",
    file: "results.csv",
    timestamp: "2023-10-26 09:00 AM",
  },
];