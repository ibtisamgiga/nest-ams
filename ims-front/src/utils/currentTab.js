const currentTab = () => {
  let path = window.location.pathname;
  if (path === "/") return "/";
  else if (path === "/organizations") return "/organizations";
  else if (path === "/admins") return "/admins";
  else if (path === "/complaints") return "/complaints";
  else if (path === "/requests") return "/requests";
  else if (path === "/inventory") return "/inventory";
  else if (path === "/categories") return "/categories";
  else if (path === "/departments") return "/departments";
  else if (path === "/employees") return "/employees";
  else if (path === "/vendors") return "/vendors";
  else if (path === "/returns") return "/returns";
};

export default currentTab;
