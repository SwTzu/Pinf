export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "P-INF",
	description: "",
	navItems: [
	{
		label: "Solicitud",
		href: "/solicitud",
	},
	{
		label: "Carta de aceptacion",
		href: "/aceptacion",
	},
    {
      label: "Administracion",
      href: "/administracion",
    }
	],
	navMenuItems: [
		{
			label: "Solicitud",
			href: "/solicitud",
		},
		{
			label: "Carta de aceptacion",
			href: "/aceptacion",
		},
		{
			label: "Logout",
			href: "/logout",
		},
	],
};
