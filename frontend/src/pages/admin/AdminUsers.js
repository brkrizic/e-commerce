import React, { useEffect, useState } from "react";
import { AdminService } from "../../api/AdminService";
import ButtonBs from "../../components/ButtonComponent";
import TableComponent from "../../components/TableComponent";
import BsActionButton from "../../components/BsActionButton";

const AdminUsers = () => {
    const [selectedKey, setSelectedKey] = useState([]);
    const [page, setPage] = useState(1);

    const [users, setUsers] = useState([]);

    const isAllSelected = users.length > 0 && selectedKey.length === users.length;

    const fetchUsers = async () => {
        const response = await AdminService.getAllUsers();

        console.log(response)

        setUsers(response.users);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const toggleSelectedKey = (id) => {
        if (selectedKey.includes(id)) {
            setSelectedKey(selectedKey.filter((key) => key !== id));
        } else {
            setSelectedKey([...selectedKey, id]);
        }
    };

    const toggleSelectAll = () => {
        if(isAllSelected){
            setSelectedKey([])
        } else {
            setSelectedKey(users.map((user) => user._id));
        }
    };


    return(
        <div>
            <h1>User List</h1>
            {/* Action Buttons */}
            <header className="mb-3 d-flex gap-2">
                <BsActionButton
                    label="View User"
                    variant="success"
                    dataBsTarget="#viewModal"
                    disabled={selectedKey?.length !== 1}
                />

                <BsActionButton
                    label="Promote/Demote User"
                    variant="success"
                    dataBsTarget="#createModal"
                    disabled={selectedKey?.length !== 1}
                />

                <BsActionButton
                    label="Edit User"
                    variant="warning"
                    dataBsTarget="#updateModal"
                    disabled={selectedKey?.length !== 1}
                />

                <BsActionButton
                    label="Disable User"
                    variant="warning"
                    dataBsTarget="#updateModal"
                    disabled={selectedKey?.length !== 1}
                />

                <BsActionButton
                    label="Delete User"
                    variant="danger"
                    dataBsTarget="#deleteModal"
                    disabled={selectedKey?.length === 0}
                />
            </header>

            <TableComponent
                data={users}
                selectedKey={selectedKey}
                onSelect={toggleSelectedKey}
                onSelectAll={toggleSelectAll}
                columns={[
                    { label: "#", key: "index", format: (_, __, i) => i + 1 },
                    { label: "ID", key: "_id" },
                    { label: "Fullname", key: "fullname" },
                    { label: "Email", key: "email" },
                    { label: "Role", key: "role" },
                    { label: "isVerified", key: "isVerified", format: (val) => val ? "✅" : "❌" },
                    { label: "Wishlist", key: "whishlist", format: (val) => val?.length || 0 },
                    { label: "Order History", key: "orderHistory", format: (val) => val?.length || 0 },
                    {
                    label: "Created At",
                    key: "createdAt",
                    format: (val) => new Date(val).toLocaleString()
                    },
                    {
                    label: "Updated At",
                    key: "updatedAt",
                    format: (val) => new Date(val).toLocaleString()
                    }
                ]}
            />

                    {/* Pagination Buttons */}
        {/* <div className="d-flex justify-content-between mt-3">
            <ButtonBs onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
                Previous
            </ButtonBs>
            <span className="text-sm font-medium">Page {page} of {totalPages - 1}</span>
            <ButtonBs onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))} disabled={page === totalPages}>
                Next
            </ButtonBs>
        </div> */}
        </div>
    );
};

export default AdminUsers;