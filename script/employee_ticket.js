$(document).ready(function () {
    $('#employeeTable').DataTable();
});
$(document).ready(function () {
    console.log("Document is ready!");

    // Sample static data
    const employeeData = [
        {
            id: "001",
            name: "Rohith",
            phone: "01234 56789",
            specialization: "AC",
            email: "rohith@gmail.com",
            location: "Washington",
            completedWork: 7,
            pendingWork: 3
        },
        {
            id: "002",
            name: "Sham",
            phone: "78654 65523",
            specialization: "Refrigerator",
            email: "sham@gmail.com",
            location: "Sammamish",
            completedWork: 4,
            pendingWork: 2
        },
        {
            id: "003",
            name: "Maaz",
            phone: "98098 76543",
            specialization: "AC",
            email: "maaz@gmail.com",
            location: "Lynnwood",
            completedWork: 4,
            pendingWork: 2
        }
    ];

    // Initialize DataTables
    const table = $('#ticketTable').DataTable({
        paging: true,
        lengthChange: true,
        searching: true,
        ordering: true,
        info: true,
        autoWidth: false,
        responsive: true
    });

    // Insert data into the table dynamically
    employeeData.forEach((employee, index) => {
        let row = `
            <tr data-bs-toggle="collapse" data-bs-target="#details${index + 1}" class="clickable">
                <td class="details-control"></td>
                <td>${employee.id}</td>
                <td>${employee.name}</td>
                <td>${employee.phone}</td>
                <td>${employee.specialization}</td>
                <td>${employee.email}</td>
                <td>${employee.location}</td>
                <td>${employee.completedWork}</td>
                <td>${employee.pendingWork}</td>
            </tr>
            <tr class="collapse details-row" id="details${index + 1}">
                <td colspan="9">
                    <div class="row">
                        <div class="col-md-12 d-flex justify-content-center">
                            <button type="button" class="btn btn-primary modify">Modify</button>
                            <button type="button" class="btn btn-danger remove">Remove</button>
                        </div>
                    </div>
                </td>
            </tr>
        `;
        table.row.add($(row)).draw(false);
    });

    // Add event listener for opening and closing details
    $('#ticketTable tbody').on('click', 'tr.clickable', function () {
        const target = $(this).data('bs-target');
        $(target).collapse('toggle');
    });

    // Event listener for Modify button (added dynamically)
    $('#ticketTable tbody').on('click', '.modify', function () {
        const row = $(this).closest('tr').prev();
        alert(`Modify clicked for employee: ${row.find('td:eq(2)').text()}`);
        // Add your modify logic here
    });

    // Event listener for Remove button (added dynamically)
    $('#ticketTable tbody').on('click', '.remove', function () {
        const row = $(this).closest('tr').prev();
        if (confirm(`Are you sure you want to remove employee: ${row.find('td:eq(2)').text()}?`)) {
            table.row(row).remove().draw();
        }
    });
});