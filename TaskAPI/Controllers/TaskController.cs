using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskAPI.Models;
using Task = TaskAPI.Models.Task;

namespace TaskAPI.Controllers
{
    [Route("api/task")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly APIDbContext _context;

        public TaskController(APIDbContext context)
        {
            _context = context;
        }

        // GET: api/task
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Task>>> GetTasks()
        {
          if (_context.Tasks == null)
          {
              return NotFound("No Data Found!");
          }
            return await _context.Tasks.Where(e=> !e.Deleted && !e.Done).ToListAsync();
        }

        // GET: api/task/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Task>> GetTask(int id)
        {
          if (_context.Tasks == null)
          {
              return NotFound("No Data Found!");
          }
            var task = await _context.Tasks.FindAsync(id);

            if (task == null)
            {
                return NotFound("No Data Found!");
            }

            return task;
        }

        [HttpPost("filters")]
        public async Task<ActionResult<IEnumerable<Task>>> FilteredTasks(Filter filters)
        {
            if (_context.Tasks == null)
            {
                return NotFound("No Data Found!");
            }

            List<Task> allData = await _context.Tasks.ToListAsync();

            if (filters.All) 
            {
                return allData;
            }

            if(filters.LevelOfPriority != null) 
            {
                allData = allData.Where(e=> e.LevelOfPriority == filters.LevelOfPriority).ToList();
            }

            if (filters.Status != null)
            {
                allData = allData.Where(e => e.Status == filters.Status).ToList();
            }

            if (filters.SpecifiedDate != null)
            {
                allData = allData.Where(e => e.DueDate == filters.SpecifiedDate).ToList();
            }

            if (filters.StartDate != null && filters.EndDate != null)
            {
                allData = allData.Where(e => e.DueDate >= filters.StartDate && e.DueDate <= filters.EndDate).ToList();
            }

            allData = allData.Where(e => e.Done == filters.Done).ToList();
            allData = allData.Where(e => e.Deleted == filters.Deleted).ToList();

            return allData;
        }

        // PUT: api/task/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTask(int id, Task task)
        {
            if (id != task.Id)
            {
                return BadRequest("You are trying to modify the incorrect task.");
            }

            // _context.Entry(task).State = EntityState.Modified;

            try
            {
                Task entry_ = await _context.Tasks.FirstAsync(e=> e.Id == task.Id);

                if(entry_.Title != task.Title)
                {
                    entry_.Title = task.Title;
                }
                if (entry_.Description != task.Description)
                {
                    entry_.Description = task.Description;
                }
                if (entry_.LevelOfPriority != task.LevelOfPriority)
                {
                    entry_.LevelOfPriority = task.LevelOfPriority;
                }
                if (entry_.Status != task.Status)
                {
                    entry_.Status = task.Status;
                }
                if (entry_.Done != task.Done)
                {
                    entry_.Done = task.Done;
                }
                if (entry_.Deleted != task.Deleted)
                {
                    entry_.Deleted = task.Deleted;
                }
                if (entry_.DueDate != task.DueDate)
                {
                    entry_.DueDate = task.DueDate;
                }

                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TaskExists(id))
                {
                    return NotFound("The task with the Id " + id + " does not exist!");
                }
                else
                {
                    throw;
                }
            }

            return Ok("Task updated successfully!");
        }

        // POST: api/task
        [HttpPost]
        public async Task<ActionResult<Task>> PostTask(Task task)
        {
          if (_context.Tasks == null)
          {
              return Problem("Entity set 'Tasks'  is null.");
          }

          try
          {
                _context.Tasks.Add(task);
                await _context.SaveChangesAsync();
          }
          catch (DbUpdateConcurrencyException e)
          {
                return BadRequest("Could not create the new Task: " + e.Message);
          }

          return CreatedAtAction("GetTask", new { id = task.Id }, task);
        }

        // DELETE: api/task/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            if (_context.Tasks == null)
            {
                return NotFound("No Data Found!");
            }
            var task = await _context.Tasks.FirstAsync(e=> e.Id == id);
            if (task == null)
            {
                return NotFound("No task with the Id " + id + "");
            }

            Task task_ = await _context.Tasks.FirstAsync(e => e.Id == task.Id);
            task_.UpdatedDate = DateTime.Now;
            task_.Deleted = true;

            // _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();

            return Ok("Task deleted successfully!");
        }

        private bool TaskExists(int id)
        {
            return (_context.Tasks?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
