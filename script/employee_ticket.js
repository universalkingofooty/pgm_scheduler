$(document).ready(function () {
    console.log("Document is ready!");

        // // Function to fetch employee data from API
        // async function fetchEmployeeData() {
        //     try {
        //         const response = await fetch('YOUR_API_ENDPOINT_HERE'); // Replace with your API endpoint
        //         if (!response.ok) {
        //             throw new Error('Network response was not ok');
        //         }
        //         const employeeData = await response.json(); // Assuming the API returns JSON
    
        //         // Call a function to populate the table and cards
        //         populateEmployeeTableAndCards(employeeData);
        //     } catch (error) {
        //         console.error('There was a problem with the fetch operation:', error);
        //     }
        // }

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

    // Initialize DataTables for larger screens
    const table = $('#ticketTable').DataTable({
        paging: true,
        lengthChange: true,
        searching: true,
        ordering: true,
        info: true,
        autoWidth: false,
        responsive: true
    });

    // Insert data into the table and card layout dynamically
    const tableBody = document.querySelector("#employeeTableBody");
    const cardContainer = document.querySelector("#employeeCards");

    employeeData.forEach((employee, index) => {
        // Table Row for larger screens
        const tableRow = `
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
                            <button type="button" class="btn btn-primary modify" onclick="modifyEmployee(${index})">Modify</button>
                            <button type="button" class="btn btn-danger remove" onclick="removeEmployee(${index})">Remove</button>
                        </div>
                    </div>
                </td>
            </tr>
        `;
        tableBody.innerHTML += tableRow;

        // Card Layout for smaller screens
        const card = `
            <div class="card mb-3">
                <div class="card-body">
                    <h5 class="card-title">Employee ID: ${employee.id}</h5>
                    <p class="card-text"><strong>Name:</strong> ${employee.name}</p>
                    <p class="card-text"><strong>Phone:</strong> ${employee.phone}</p>
                    <p class="card-text"><strong>Specialization:</strong> ${employee.specialization}</p>
                    <p class="card-text"><strong>Email:</strong> ${employee.email}</p>
                    <p class="card-text"><strong>Location:</strong> ${employee.location}</p>
                    <p class="card-text"><strong>Completed Work:</strong> ${employee.completedWork}</p>
                    <p class="card-text"><strong>Pending Work:</strong> ${employee.pendingWork}</p>
                    <div class="d-flex justify-content-center">
                        <button type="button" class="btn btn-primary modify me-2" onclick="modifyEmployee(${index})">Modify</button>
                        <button type="button" class="btn btn-danger remove" onclick="removeEmployee(${index})">Remove</button>
                    </div>
                </div>
            </div>
        `;
        cardContainer.innerHTML += card;
    });

    // fetchEmployeeData();


    // Add event listener for opening and closing details in the table
    $('#ticketTable tbody').on('click', 'tr.clickable', function () {
        const target = $(this).data('bs-target');
        $(target).collapse('toggle');
    });

    // Event listener for Modify button
    $('#ticketTable tbody').on('click', '.modify', function () {
        const row = $(this).closest('tr').prev();
        alert(`Modify clicked for employee: ${row.find('td:eq(2)').text()}`);
        // Add your modify logic here
    });

    // Event listener for Remove button
    $('#ticketTable tbody').on('click', '.remove', function () {
        const row = $(this).closest('tr').prev();
        if (confirm(`Are you sure you want to remove employee: ${row.find('td:eq(2)').text()}?`)) {
            table.row(row).remove().draw();
        }
    });
});
