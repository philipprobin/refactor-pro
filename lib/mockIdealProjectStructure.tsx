// lib/mockIdealProjectStructure.ts

/**
 * This file defines the ideal structure of a well-organized project.
 * It separates business logic, services, helpers, and UI concerns into different modules.
 * It utilizes various design patterns such as Strategy, Singleton, and Factory Patterns.
 */

// File type representing a folder structure
export type FileStructure = { [key: string]: string | FileStructure }

/**
 * Mock Ideal Project Structure representing a fanciful over-engineered architecture.
 */
export const mockIdealProjectStructure: FileStructure = {
    'src': {
        'main.py': `# Entry point for the fancy project
from services.graph_service import GraphService
from services.drone_service import DroneService

if __name__ == "__main__":
    # Instantiate services
    graph_service = GraphService()
    drone_service = DroneService()

    # Perform main operations
    graph_service.plot_weighted_graph()
    drone_service.run_drones()
`,
        'services': {
            'graph_service.py': `# Graph Service that encapsulates all graph-related operations
import networkx as nx
import matplotlib.pyplot as plt
from copy import deepcopy

class GraphService:
    def __init__(self):
        self.graph = nx.MultiDiGraph(format='png', directed=True)

    def plot_weighted_graph(self):
        # Simulate graph plotting logic
        print("Graph plotting started...")
        # Add graph logic here...
        plt.show()

    def add_nodes(self, node_list, pos):
        for node in node_list:
            self.graph.add_node(node, pos=pos[node])

    def add_edges(self, node_list, pos):
        for node, neighbor in zip(node_list, node_list[1:]):
            self.graph.add_edges_from([(node, neighbor)])
`,
            'drone_service.py': `# Drone Service following Strategy Pattern for different insertion strategies
from strategies.insertion_strategy import KCheapestInsertion, NearestNeighbor

class DroneService:
    def __init__(self):
        # You can switch strategies dynamically
        self.insertion_strategy = KCheapestInsertion()

    def run_drones(self):
        result = self.insertion_strategy.execute()
        print(f"Drone strategy executed: {result}")
`,
        },
        'strategies': {
            'insertion_strategy.py': `# Strategy pattern: Abstract class for insertion strategies
from abc import ABC, abstractmethod

class InsertionStrategy(ABC):
    @abstractmethod
    def execute(self):
        pass

class KCheapestInsertion(InsertionStrategy):
    def execute(self):
        print("Executing K-Cheapest Insertion...")
        # Add K-Cheapest logic here...
        return "K-Cheapest Insertion Result"

class NearestNeighbor(InsertionStrategy):
    def execute(self):
        print("Executing Nearest Neighbor...")
        # Add Nearest Neighbor logic here...
        return "Nearest Neighbor Result"
`,
        },
        'helpers': {
            'graph_helpers.py': `# Helper functions for graph-related tasks
import math

def calculate_distance(pos1, pos2):
    return math.hypot(abs(pos1[0] - pos2[0]), abs(pos1[1] - pos2[1]))

def plot_edges(graph, pos, edges, edge_labels):
    for edge in edges:
        # Draw the edge and label
        graph.add_edges_from([edge])
        print(f"Edge added: {edge}")
`,
        },
        'data': {
            'node_positions.json': `
{
    "X": [0, 0],
    "A": [220, 20],
    "B": [270, 70],
    "C": [250, 210],
    "D": [90, 60],
    "E": [120, 120],
    "F": [50, 220]
}
`,
        },
        'tests': {
            'test_graph_service.py': `# Unit tests for GraphService
import unittest
from services.graph_service import GraphService

class TestGraphService(unittest.TestCase):
    def setUp(self):
        self.graph_service = GraphService()

    def test_add_nodes(self):
        node_list = ['X', 'A', 'B']
        pos = {'X': (0, 0), 'A': (220, 20), 'B': (270, 70)}
        self.graph_service.add_nodes(node_list, pos)
        # Add assertion here
        print("Test add_nodes passed.")

    def test_plot_weighted_graph(self):
        self.graph_service.plot_weighted_graph()
        print("Test plot_weighted_graph passed.")

if __name__ == "__main__":
    unittest.main()
`,
        },
        'config': {
            'config.py': `# Global configuration file

class Config:
    DRONE_SPEED = 14
    TRUCK_SPEED = 7
    WAIT_COST_TRUCK = 12
    WAIT_COST_DRONE = 3

    @staticmethod
    def get_config():
        return {
            "drone_speed": Config.DRONE_SPEED,
            "truck_speed": Config.TRUCK_SPEED,
            "wait_cost_truck": Config.WAIT_COST_TRUCK,
            "wait_cost_drone": Config.WAIT_COST_DRONE
        }
`,
        },
        'README.md': `# Fancy Modular Project
This is a highly modular and over-engineered project demonstrating the best practices in Python code organization. 
Key design patterns like Strategy, Singleton, and Service architecture are employed.

## Structure Overview:
- \`services\`: Contains service classes responsible for core business logic.
- \`strategies\`: Implements Strategy pattern for flexible algorithm switching.
- \`helpers\`: Contains helper methods for repetitive tasks.
- \`data\`: Stores mock data like node positions.
- \`tests\`: Unit test files for each service and module.
- \`config\`: Centralized configuration settings.

## How to Run:
1. Run \`main.py\` as the entry point.
2. Use \`tests/\` for unit testing.
3. Modify strategies dynamically for different drone logistics.
`,
    }
}

