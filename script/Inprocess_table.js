$(document).ready(function () {
    function format(rowData) {
        return `
            <tr class="collapse-content details-row" data-ticket-id="${rowData.ticketID}">
                <td colspan="8">
                    <div class="row">
                        <div class="col-md-1"></div>

                        <div class="col-md-4">
                            <strong class="d-flex justify-content-left">Customer Address</strong>
                            <p class="pt-2" style="font-size: 13px;text-align: left;">${rowData.address}</p>
                            <label class="mt-3 d-flex justify-content-left">Employee Name</label>
                            <select class="form-select mt-2 employee-select" disabled>
                                ${rowData.employees.map(employee => `
                                    <option value="${employee.name}" ${employee.pending > 5 ? 'disabled' : ''}>
                                        ${employee.name}
                                    </option>
                                `).join('')}
                            </select>
                            <small class="text-muted mt-2">Pending work: <span class="pending-work">${rowData.employees[0].pending}</span></small>
                        </div>

                        <div class="col-md-1"></div>

                        <div class="col-md-6">
                            <strong class="d-flex justify-content-left">Description:</strong>
                            <p style="font-size: 16px;text-align: left;" class="pt-2">${rowData.description}</p>
                            <div class="row">
                                <div class="col-6">
                                    <button class="btn btn-assign">
                                        ReAssign
                                    </button>
                                </div>
                                <div class="col-6"></div>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>`;
    }

    // Sample data for dynamic row details
    const rowDetails = [
        {
            ticketID: '001',
            address: 'KING SQUARE OLD NO.1 NEW NO.2, PLOT B 31, 6th Ave, Ashok Nagar, Chennai, Tamil Nadu 600083',
            description: 'AC issue with cooling.',
            employees: [
                { name: 'Ganesh', pending: 3 },
                { name: 'Rohith', pending: 6 }, // More than 5, should be disabled
                { name: 'Meera', pending: 2 }
            ]
        },
        {
            ticketID: '002',
            address: 'No. 45, Second St, Besant Nagar, Chennai, Tamil Nadu 600090',
            description: 'Fridge issue.',
            employees: [
                { name: 'Ganesh', pending: 4 },
                { name: 'Rohith', pending: 5 },
                { name: 'Meera', pending: 1 }
            ]
        },
        {
            ticketID: '003',
            address: 'No. 45, Second St, Besant Nagar, Chennai, Tamil Nadu 600090',
            description: 'Fridge issue.',
            employees: [
                { name: 'Ganesh', pending: 4 },
                { name: 'Rohith', pending: 5 },
                { name: 'Meera', pending: 1 }
            ]
        }
    ];

    // Initialize DataTables
  
    // setting initital name 
    $('#ticketTable tbody tr').each(function () 
    {
        var ticketID = $(this).find('td:nth-child(2)').text(); 
        var details = rowDetails.find(detail => detail.ticketID === ticketID); 
        
        // Set the initial assigned employee in the table's main row
        if (details && details.employees.length > 0) {
            var initialEmployee = details.employees[0].name; 
            $(this).find('.assigned-employee').text(initialEmployee);
        }
    });

    var table = $('#ticketTable').DataTable({
      
        "paging": true,
        "lengthChange": true,
        "searching": true,
        "ordering": true,
        "info": true,
        "autoWidth": false,
        "responsive": true
    });

    // Expand row details on click
    $('#ticketTable tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = table.row(tr);
        var ticketID = tr.find('td:nth-child(2)').text(); // Get the ticket ID

        var details = rowDetails.find(detail => detail.ticketID === ticketID);

        if (row.child.isShown()) {
            row.child.hide();
            tr.removeClass('shown');
        } else {
            row.child(format(details)).show();
            tr.addClass('shown');
        }
    });

    // Reassign button logic
    $('#ticketTable tbody').on('click', '.btn-assign', function () {
        $(this).closest('.details-row').find('.employee-select').prop('disabled', false);
    });

    // Update the assigned employee when an employee is selected
    $('#ticketTable tbody').on('change', '.employee-select', function () {
        var selectedEmployee = $(this).val(); 
        var detailsRow = $(this).closest('tr.details-row'); 
        var ticketID = detailsRow.data('ticket-id'); 

        // Find the corresponding main row based on the ticket ID
        var mainRow = $(`#ticketTable tbody tr:not(.details-row)`).filter(function () {
            return $(this).find('td:nth-child(2)').text() === ticketID;
        });
        mainRow.find('.assigned-employee').text(selectedEmployee);

        table.row(mainRow).invalidate().draw();     
    });
});   

