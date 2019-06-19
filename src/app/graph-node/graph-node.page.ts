import { Component, OnInit } from "@angular/core";
import { GraphNodesService } from "./graph-nodes.service";

@Component({
  selector: "app-graph-node",
  templateUrl: "./graph-node.page.html",
  styleUrls: ["./graph-node.page.scss"]
})
export class GraphNodePage implements OnInit {
  constructor(private graphNodesService: GraphNodesService) {}

  ngOnInit() {
    console.log(this.graphNodesService.getAllNodes());
  }
}
