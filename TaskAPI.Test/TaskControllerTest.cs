using Microsoft.AspNetCore.Mvc;
using TaskAPI.Controllers;

namespace TaskAPI.Test
{
    public class TaskControllerTest
    {
        TaskController _controller;

        public TaskControllerTest()
        {

        }

        [Fact]
        public async Task GetTasksTest()
        {
            //Arrange
            //Act
            var result = _controller.GetTasks();
            //Assert

        }
    }
}