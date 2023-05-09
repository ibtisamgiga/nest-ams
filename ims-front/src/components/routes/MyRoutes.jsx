import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminPage from "../../pages/AdminPage";
import ComplaintsPage from "../../pages/ComplaintsPage";
import CreateAdminPage from "../../pages/CreateAdminPage";
import CreateOrganizationPage from "../../pages/create-organization-page/CreateOrganizationPage";
import LoginPage from "../../pages/LoginPage";
import OrganizationPage from "../../pages/OrganizationPage";
import SADashboardPage from "../../pages/saDashboard/SADashboardPage";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
import AdminDetailPage from "../../pages/admin-detail/AdminDetailPage";
import OrganizationDetailPage from "../../pages/organization-detail/OrganizationDetailPage";
import ComplaintDetailPage from "../../pages/complaints-detail/ComplaintDetailPage";
import CategoriesPage from "../../pages/admin-pages/category-page/CategoriesPage";
import ProtectedRoutes from "./ProtectedRoutes";
import AdminDashboardPage from "../../pages/admin-pages/admin-dashboard-page/AdminDashboardPage";
import InventoryPage from "../../pages/admin-pages/inventory-page/InventoryPage";
import InventoryDetailPage from "../../pages/admin-pages/inventory-detail-page/InventoryDetailPage";
import CreateItemPage from "../../pages/admin-pages/create-item-page/CreateItemPage";
import DepartmentPage from "../../pages/admin-pages/department-page/DepartmentPage";
import CreateDepartmentPage from "../../pages/admin-pages/create-department-page/CreateDepartment";
import DepartmentDetailPage from "../../pages/admin-pages/department-detail-page/DepartmentDetailPage";
import CreateCategoryPage from "../../pages/admin-pages/create-category-page/CreateCategoryPage";
import CategoryDetailPage from "../../pages/admin-pages/category-detail-page/CategoryDetailPage";
import EmployeePage from "../../pages/admin-pages/employee-page/EmployeePage";
import CreateEmployeePage from "../../pages/admin-pages/create-emplyee-page/CreateEmployeePage";
import EmployeeDetailPage from "../../pages/admin-pages/employee-detail-page/EmployeeDetailPage";
import VendorPage from "../../pages/admin-pages/vendor-page/VendorPage";
import CreateVendorPage from "../../pages/admin-pages/create-vendor-page/CreateVendorPage";
import VendorDetailPage from "../../pages/admin-pages/vendor-detail-page/VendorDetailPage";
import RequestPage from "../../pages/admin-pages/request-page/RequestPage";
import RequestDetailPage from "../../pages/admin-pages/request-detail-page/RequestDetailPage";
import ReturnPage from "../../pages/admin-pages/return-page/ReturnPage";
import ReturnDetailPage from "../../pages/admin-pages/return-detail-page/ReturnDetailPage";
import EmployeeDashboardPage from "../../pages/employee-pages/employee-dashboard/EmployeeDashboardPage";
import EmployeeRequestPage from "../../pages/employee-pages/employee-request-page/EmployeeRequestPage";
import CreateRequestPage from "../../pages/employee-pages/create-employee-request-page/CreateRequestPage";
import EmployeeRequestDetailPage from "../../pages/employee-pages/employee-request-detail-page/EmployeeRequestDetailPage";
import EmployeeComplainPage from "../../pages/employee-pages/employee-complain-page/EmployeeComplainPage";
import CreateComplaintPage from "../../pages/admin-pages/create-complaint-page/CreateComplaintPage";
import EditEmployeePage from "../../pages/employee-pages/create-employee-page/EditEmployeePage";
import EditOrganizationPage from "../../pages/edit-organization-page/EditOrganizationPage";
import EditAdminPage from "../../pages/edit-admin-page/EditAdminPage";
import AdminComplaintsPage from "../../pages/admin-pages/complain-page/AdminComplainPage";
import EmployeeComplaintDetailPage from "../../pages/employee-pages/employee-complain-detail-page/EmployeeComplaintDetailPage";
import EditItemPage from "../../pages/admin-pages/edit-item-page/EditItemPage";
import EditDepartmentPage from "../../pages/admin-pages/edit-department-page/EditDepartmentPage";
import EditEmployeeInfoPage from "../../pages/admin-pages/edit-employee-page/EditEmployeePage";
import EditVendorPage from "../../pages/admin-pages/edit-vendor-page/EditVendorPage";
import ResetPasswordPage from "../../pages/reset-password-page/ResetPasswordPage";
import AddSubCategoryPage from "../../pages/admin-pages/Add-category-page/AddSubCategoryPage";
function MyRoutes({ user }) {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoutes user={user}>
            {user?.role == "superadmin" ? (
              <SADashboardPage />
            ) : user?.role == "admin" ? (
              <AdminDashboardPage />
            ) : user?.role == "employee" ? (
              <EmployeeDashboardPage />
            ) : null}
          </PrivateRoutes>
        }
      />
      <Route
        path="/admins"
        element={
          <PrivateRoutes user={user}>
            <AdminPage />
          </PrivateRoutes>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoutes>
            <LoginPage />
          </PublicRoutes>
        }
      />
      <Route
        path="/organizations"
        element={
          <PrivateRoutes user={user}>
            <OrganizationPage />
          </PrivateRoutes>
        }
      />
      <Route
        path="/complaints"
        element={
          <PrivateRoutes user={user}>
            {user?.role == "superadmin" ? (
              <ComplaintsPage />
            ) : user?.role == "admin" ? (
              <AdminComplaintsPage />
            ) : user?.role == "employee" ? (
              <EmployeeComplainPage />
            ) : null}
          </PrivateRoutes>
        }
      />

      <Route
        exact
        path="/create/admin"
        element={
          <PrivateRoutes user={user}>
            <CreateAdminPage />
          </PrivateRoutes>
        }
      />
      <Route
        path="/create/organization"
        element={
          <PrivateRoutes user={user}>
            <CreateOrganizationPage />
          </PrivateRoutes>
        }
      />

      <Route
        path="/admin/detail/:id"
        element={
          <PrivateRoutes user={user}>
            <AdminDetailPage />
          </PrivateRoutes>
        }
      />
      <Route
        path="/admin/edit/:id"
        element={
          <PrivateRoutes user={user}>
            <EditAdminPage />
          </PrivateRoutes>
        }
      />
      <Route
        path="/organization/detail/:id"
        element={
          <PrivateRoutes user={user}>
            <OrganizationDetailPage />
          </PrivateRoutes>
        }
      />
      <Route
        path="/organization/edit/:id"
        element={
          <PrivateRoutes user={user}>
            <EditOrganizationPage />
          </PrivateRoutes>
        }
      />
      <Route
        path="/complaint/create"
        element={
          <PrivateRoutes user={user}>
            <ProtectedRoutes role={["admin", "employee"]} user={user}>
              <CreateComplaintPage />
            </ProtectedRoutes>
          </PrivateRoutes>
        }
      />
      <Route
        path="/complaints/detail/:id"
        element={
          <PrivateRoutes user={user}>
            {user?.role == "employee" ? (
              <EmployeeComplaintDetailPage />
            ) : (
              <ComplaintDetailPage />
            )}
          </PrivateRoutes>
        }
      />

      <Route
        path="/categories"
        element={
          <PrivateRoutes user={user}>
            <ProtectedRoutes role={["admin"]} user={user}>
              <CategoriesPage />
            </ProtectedRoutes>
          </PrivateRoutes>
        }
      />
      <Route
        path="/inventory"
        element={
          <PrivateRoutes user={user}>
            <ProtectedRoutes role={["admin"]} user={user}>
              <InventoryPage />
            </ProtectedRoutes>
          </PrivateRoutes>
        }
      />
      <Route
        path="/inventory/detail/:id"
        element={
          <PrivateRoutes user={user}>
            <ProtectedRoutes role={["admin"]} user={user}>
              <InventoryDetailPage />
            </ProtectedRoutes>
          </PrivateRoutes>
        }
      />
      <Route
        path="/inventory/create"
        element={
          <PrivateRoutes user={user}>
            <ProtectedRoutes role={["admin"]} user={user}>
              <CreateItemPage />
            </ProtectedRoutes>
          </PrivateRoutes>
        }
      />
      <Route
        path="/inventory/edit/:id"
        element={
          <PrivateRoutes user={user}>
            <ProtectedRoutes role={["admin"]} user={user}>
              <EditItemPage />
            </ProtectedRoutes>
          </PrivateRoutes>
        }
      />

      <Route
        path="/departments"
        element={
          <PrivateRoutes user={user}>
            <ProtectedRoutes role={["admin"]} user={user}>
              <DepartmentPage />
            </ProtectedRoutes>
          </PrivateRoutes>
        }
      />
      <Route
        path="/department/create"
        element={
          <PrivateRoutes user={user}>
            <ProtectedRoutes role={["admin"]} user={user}>
              <CreateDepartmentPage />
            </ProtectedRoutes>
          </PrivateRoutes>
        }
      />

      <Route
        path="/department/detail/:id"
        element={
          <PrivateRoutes user={user}>
            <ProtectedRoutes role={["admin"]} user={user}>
              <DepartmentDetailPage />
            </ProtectedRoutes>
          </PrivateRoutes>
        }
      />

      <Route
        path="/department/edit/:id"
        element={
          <PrivateRoutes user={user}>
            <ProtectedRoutes role={["admin"]} user={user}>
              <EditDepartmentPage />
            </ProtectedRoutes>
          </PrivateRoutes>
        }
      />
      <Route
        path="/category/create"
        element={
          <PrivateRoutes user={user}>
            <ProtectedRoutes role={["admin"]} user={user}>
              <CreateCategoryPage />
            </ProtectedRoutes>
          </PrivateRoutes>
        }
      />
      <Route
        path="/category/detail/:id"
        element={
          <PrivateRoutes user={user}>
            <ProtectedRoutes role={["admin"]} user={user}>
              <CategoryDetailPage />
            </ProtectedRoutes>
          </PrivateRoutes>
        }
      />

      <Route
        path="/category/edit/:id"
        element={
          <PrivateRoutes user={user}>
            <ProtectedRoutes role={["admin"]} user={user}>
             <AddSubCategoryPage/>
            </ProtectedRoutes>
          </PrivateRoutes>
        }
      />

      <Route
        path="/employees"
        element={
          <PrivateRoutes user={user}>
            <ProtectedRoutes role={["admin"]} user={user}>
              <EmployeePage />
            </ProtectedRoutes>
          </PrivateRoutes>
        }
      />
      <Route
        path="/employee/create"
        element={
          <PrivateRoutes user={user}>
            <ProtectedRoutes role={["admin"]} user={user}>
              <CreateEmployeePage />
            </ProtectedRoutes>
          </PrivateRoutes>
        }
      />
      <Route
        path="/employee/edit"
        element={
          <PrivateRoutes user={user}>
            <ProtectedRoutes role={["employee"]} user={user}>
              <EditEmployeePage />
            </ProtectedRoutes>
          </PrivateRoutes>
        }
      />
      <Route
        path="/employee/edit/:id"
        element={
          <PrivateRoutes user={user}>
            <ProtectedRoutes role={["admin"]} user={user}>
              <EditEmployeeInfoPage />
            </ProtectedRoutes>
          </PrivateRoutes>
        }
      />
      <Route
        path="/employee/detail/:id"
        element={
          <PrivateRoutes user={user}>
            <ProtectedRoutes role={["admin"]} user={user}>
              <EmployeeDetailPage />
            </ProtectedRoutes>
          </PrivateRoutes>
        }
      />
      <Route
        path="/vendors"
        element={
          <PrivateRoutes user={user}>
            <ProtectedRoutes role={["admin"]} user={user}>
              <VendorPage />
            </ProtectedRoutes>
          </PrivateRoutes>
        }
      />
      <Route
        path="/vendor/create"
        element={
          <PrivateRoutes user={user}>
            <ProtectedRoutes role={["admin"]} user={user}>
              <CreateVendorPage />
            </ProtectedRoutes>
          </PrivateRoutes>
        }
      />
      <Route
        path="/vendor/detail/:id"
        element={
          <PrivateRoutes user={user}>
            <ProtectedRoutes role={["admin"]} user={user}>
              <VendorDetailPage />
            </ProtectedRoutes>
          </PrivateRoutes>
        }
      />
      <Route
        path="/vendor/edit/:id"
        element={
          <PrivateRoutes user={user}>
            <ProtectedRoutes role={["admin"]} user={user}>
              <EditVendorPage />
            </ProtectedRoutes>
          </PrivateRoutes>
        }
      />
      <Route
        path="/requests"
        element={
          <PrivateRoutes user={user}>
            <ProtectedRoutes role={["admin", "employee"]} user={user}>
              {user?.role == "superAdmin" ? (
                <RequestPage />
              ) : user?.role == "admin" ? (
                <RequestPage />
              ) : (
                <EmployeeRequestPage />
              )}
            </ProtectedRoutes>
          </PrivateRoutes>
        }
      />
      <Route
        path="/request/create"
        element={
          <PrivateRoutes user={user}>
            <ProtectedRoutes role={["employee"]} user={user}>
              <CreateRequestPage />
            </ProtectedRoutes>
          </PrivateRoutes>
        }
      />
      <Route
        path="/request/detail/:id"
        element={
          <PrivateRoutes user={user}>
            <ProtectedRoutes role={["admin", "employee"]} user={user}>
              {user?.role == "admin" ? (
                <RequestDetailPage />
              ) : (
                <EmployeeRequestDetailPage />
              )}
            </ProtectedRoutes>
          </PrivateRoutes>
        }
      />

      <Route
        path="/returns"
        element={
          <PrivateRoutes user={user}>
            <ProtectedRoutes role={["admin"]} user={user}>
              <ReturnPage />
            </ProtectedRoutes>
          </PrivateRoutes>
        }
      />

      <Route
        path="/return/detail/:id"
        element={
          <PrivateRoutes user={user}>
            <ProtectedRoutes role={["admin"]} user={user}>
              <ReturnDetailPage />
            </ProtectedRoutes>
          </PrivateRoutes>
        }
      />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
    </Routes>
  );
}

export default MyRoutes;
