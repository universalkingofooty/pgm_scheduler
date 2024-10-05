document.addEventListener('DOMContentLoaded', viewcompanydetails);

function viewcompanydetails() {
    const tableBody = document.querySelector("#employeeTableBody");

    const apiUrl = `https://m4j8v747jb.execute-api.us-west-2.amazonaws.com/dev/employee/getall`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Store the fetchxed data
            let employeesData = data;
            console.log(employeesData)

            // Clear the existing table body content
            tableBody.innerHTML = '';

            let index = 0;
            let employeeId = 1;
            // Populate the table body with fetched data
            employeesData.forEach((employee) => {
                // Table Row for larger screens
                const tableRow = `
                <tr data-bs-toggle="collapse" data-bs-target="#details${index + 1}" class="clickable">
                    <td class="details-control"></td>
                    <td>${employeeId++}</td>
                    <td>${employee.first_name}</td>
                    <td>${employee.phone_number}</td>
                    <td>${employee.specialization}</td>
                    <td>${employee.email}</td>
                    <td>${employee.assigned_locations}</td>
                    <td>${employee.employee_no_of_completed_work}</td>
                    <td>${employee.no_of_pending_works}</td>
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
                </tr>`;
            tableBody.innerHTML += tableRow;
            index++;
            });


            // Initialize DataTable after populating data
            $(document).ready(function () {
                $('#ticketTable').DataTable({
                    // Optional configurations
                    "paging": true,
                    "lengthChange": true,
                    "searching": true,
                    "ordering": true,
                    "info": true,
                    "autoWidth": false,
                    "responsive": true,

                });
            });
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });






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
}
