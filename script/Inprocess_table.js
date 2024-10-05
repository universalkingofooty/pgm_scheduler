document.addEventListener('DOMContentLoaded', viewcompanydetails);

function viewcompanydetails() {
    const tableBody = document.querySelector("#InprocessDetails");

    const apiUrl = `https://m4j8v747jb.execute-api.us-west-2.amazonaws.com/dev/tickets/inprogress/ShddWeFGFGkk9b67STTJY4`;

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
             
                const tableRow = `
                <tr data-bs-toggle="collapse" data-bs-target="#details${index + 1}" class="clickable">
                    <td class="details-control"></td>
                    <td>${employee.ticket_id}</td>
                    <td>${employee.ticket_type}</td>
                    <td>${employee.name}</td>
                    <td>${employee.phone_number}</td>
                    <td>${employee.complain_raised_date}</td>
                    <td>${employee.city}</td>
                    <td>${employee.name}</td>
                    
                </tr>
                <tr class="collapse details-row" id="details${index + 1}">
                    <td colspan="8">
                    <div class="row">
                        <div class="col-md-1"></div>
                        <div class="col-md-4">
                            <strong class="d-flex justify-content-left">Customer Address</strong>
                            <p class="pt-2" style="font-size: 13px;text-align: left;">${employee.street},${employee.city},${employee.zip},${employee.state}</p>
                            

                            <label class="mt-3 d-flex justify-content-left">Employee Name</label>
                            <select class="form-select mt-2 employee-select" disabled>
                                {employeeOptions}
                            </select>
                            <small class="text-muted mt-2">Pending work: <span class="pending-work">{employee.employees[0].pending}</span></small>
                        </div>
                        <div class="col-md-1"></div>
                        <div class="col-md-6">
                            <strong class="d-flex justify-content-left">Description:</strong>
                            <p style="font-size: 16px;text-align: left;" class="pt-2">${employee.description}</p>
                            <div class="row">
                               <div class="col-6">
                                     <div class="image-gallery">
                                        <img src="images/profile img.png" alt="Image 1" width="100px">
                                        <div class="image-container">
                                            <img src="images/profile img.png" alt="Image 1">
                                            <div class="overlay">+3</div>
                                        </div>
                                        <div class="thumbnail-container" id="additional-images" style="display: none;">
                                            <img src="images/profile img.png" alt="Additional Image 1">
                                            <img src="images/profile img.png" alt="Additional Image 2">
                                        
                                        </div>
                                    </div>
                                </div>
                                
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
