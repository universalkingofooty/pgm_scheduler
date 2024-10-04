$(document).ready(function () {

    var rejecttedTictet = JSON.parse(localStorage.getItem('rejectedTicketrestore'));
    const rowDetails = [
        {
            ticketID: '007',
            address: 'KING SQUARE OLD NO.1 NEW NO.2, PLOT B 31, 6th Ave, Ashok Nagar, Chennai, Tamil Nadu 600083',
            description: 'AC issue with cooling.',
            issueType: 'ac', // Add issueType
            customerName: 'Rohith', // Add customerName
            phone: '01234 56789', // Add phone
            date: '12/12/2024', // Add date
            city: 'Chennai',
            employees: [
                { name: 'Ganesh', pending: 3 },
                { name: 'Rohith', pending: 6 }, // More than 5, should be disabled
                { name: 'Meera', pending: 2 }
            ]
        },
        {
            ticketID: '008',
            address: 'No. 45, Second St, Besant Nagar, Chennai, Tamil Nadu 600090',
            description: 'Fridge issue.',
            issueType: 'Fridge', // Add issueType
            customerName: 'Karthik', // Add customerName
            phone: '01234 56789', // Add phone
            date: '12/12/2024', // Add date
            city: 'Chennai',
            employees: [
                { name: 'Ganesh', pending: 4 },
                { name: 'Rohith', pending: 5 },
                { name: 'Meera', pending: 1 }
            ]
        },
        {
            ticketID: '009',
            address: 'No. 45, Second St, Besant Nagar, Chennai, Tamil Nadu 600090',
            description: 'Fridge issue.',
            issueType: 'Fridge', // Add issueType
            customerName: 'Sharma', // Add customerName
            phone: '01234 56789', // Add phone
            date: '13/12/2024', // Add date
            city: 'Besant Nagar',
            employees: [
                { name: 'Ganesh', pending: 4 },
                { name: 'Rohith', pending: 5 },
                { name: 'Meera', pending: 1 }
            ]
        }
    ];

    if (rejecttedTictet) {
        rowDetails.push({
            ...rejecttedTictet, // Keep other ticket details
            employee: rejecttedTictet.employee  // Ensure employee is set
        });
        var newRow = `
            <tr class="main-row" data-ticket-id="${rejecttedTictet.ticketID}">
                <td class="details-control" style="cursor: pointer;"></td> <!-- Control for expanding/collapsing -->
                <td>${rejecttedTictet.ticketID}</td>
                <td><div class="issue-type ${rejecttedTictet.issueType.toLowerCase()}"><span class="circle"></span> ${rejecttedTictet.issueType}</div></td>
                <td>${rejecttedTictet.customerName}</td>
                <td>${rejecttedTictet.phone}</td>
                <td>${rejecttedTictet.date}</td>
                <td>${rejecttedTictet.city}</td>
               
            </tr>
        `;
        $('#unassignedTicketTable tbody').append(newRow); 
         // Prevents paging reset
    
        // localStorage.removeItem('rejectedTicketrestore'); // Clear the data from local storage

    }
    function format(rowData) {
        return `
            <tr class="collapse-content details-row" data-ticket-id="${rowData.ticketID}">
                <td colspan="8">
                    <div class="row">
                        <div class="col-md-1"></div>
                        <div class="col-md-4">
                            <strong class="d-flex justify-content-left">Customer Address</strong>
                            <p class="pt-2" style="font-size: 13px;text-align: left; address">${rowData.address}</p>
                            <label class="mt-3 d-flex justify-content-left">Employee Name</label>
                            <select class="form-select mt-2 employee-select">
                                <option value="" selected>Select Employee</option>
                                ${rowData.employees.map(employee => `
                                    <option value="${employee.name}" ${employee.pending > 5 ? 'disabled' : ''}>
                                        ${employee.name}
                                    </option>
                                `).join('')}
                            </select>
                            <small>Pending work: <span class="pending-work">${rowData.employees[0].pending}</span></small>
                        </div>
                        <div class="col-md-1"></div>
                        <div class="col-md-6">
                            <strong>Description:</strong>
                            <div class="row">
                                <p class="description">${rowData.description}</p>
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
                                <div class="col-6">
                                    <div class="button-container">
                                        <button class="btn btn-assign" disabled>Assign</button>
                                        <button class="btn btn-reject mt-3" >Reject</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>`;
    }

    // Initialize DataTable for unassigned tickets
    var table = $('#unassignedTicketTable').DataTable({
        "paging": true,
        "lengthChange": true,
        "searching": true,
        "ordering": true,
        "info": true,
        "autoWidth": false,
        "responsive": true
    });

    // Expand row details on click
    $('#unassignedTicketTable tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = table.row(tr);
        var ticketID = tr.find('td:nth-child(2)').text(); 
        var details = rowDetails.find(detail => detail.ticketID === ticketID);

        if (row.child.isShown()) {
            row.child.hide();
            tr.removeClass('shown');
        } else {
            row.child(format(details)).show();
            tr.addClass('shown');
        }
    });

    

    // Enable the "Assign" button when an employee is selected
    $('#unassignedTicketTable tbody').on('change', '.employee-select', function () {
        if ($(this).val()) {
            $(this).closest('.details-row').find('.btn-assign').prop('disabled', false);
        }
    });

   
   // Update the assigned employee and move row to in-process table
$('#unassignedTicketTable tbody').on('click', '.btn-assign', function () {
    var detailsRow = $(this).closest('tr.details-row');
    var selectedEmployee = detailsRow.find('.employee-select').val();
    var ticketID = detailsRow.data('ticket-id');
    var mainRow = $(`#unassignedTicketTable tbody tr:not(.details-row)`).filter(function () {
        return $(this).find('td:nth-child(2)').text() === ticketID;
    });
 
    var details = rowDetails.find(detail => detail.ticketID === ticketID);

    if (details) {
        // Update the employee assignment in details
        details.employees = details.employees.map(emp => {
            if (emp.name === selectedEmployee) {
                emp.pending += 1; // Increment pending work if needed
            }
            return emp;
        });

        // Add the assigned employee information to details
        var ticketData = {
            ...details, // Spread the full row details
            employee: selectedEmployee
        };


    // Store data in localStorage
    localStorage.setItem('inProcessTicket', JSON.stringify(ticketData));

    // Remove the row from the unassigned table
    table.row(mainRow).remove().draw();

    $('#assignModal .modal-body').html(`
        <p>Ticket ID <strong>${ticketID}</strong> has been moved to the In-Process table.</p>
        <p>Assigned to <strong>${selectedEmployee}</strong>.</p>
    `);

    $('#assignModal').modal('show');

    }
      
        $(this).prop('disabled', true);
    });


$('#unassignedTicketTable tbody').on('click', '.btn-reject', function () {
    var detailsRow = $(this).closest('tr.details-row');
    var ticketID = detailsRow.data('ticket-id');
    var mainRow = $(`#unassignedTicketTable tbody tr:not(.details-row)`).filter(function () {
        return $(this).find('td:nth-child(2)').text() === ticketID;
    });
    
    var details = rowDetails.find(detail => detail.ticketID === ticketID);

    if (details) {
        // Store rejected ticket data in localStorage
        localStorage.setItem('rejectedTicket', JSON.stringify(details));

        // Remove the row from the unassigned table
        table.row(mainRow).remove().draw();
    }

    $(this).prop('disabled', true);
});
});

