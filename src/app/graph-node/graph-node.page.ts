import { Component, OnInit } from "@angular/core";
import { GraphNodesService } from "./graph-nodes.service";
import { ActivatedRoute } from "@angular/router";
import { GraphNode } from "./graph-node.model";

@Component({
  selector: "app-graph-node",
  templateUrl: "./graph-node.page.html",
  styleUrls: ["./graph-node.page.scss"]
})
export class GraphNodePage implements OnInit {
  selectedNode: GraphNode;
  childrenNodes: GraphNode[];
  constructor(
    private graphNodesService: GraphNodesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has("id")) {
        return;
      }
      this.selectedNode = this.graphNodesService.getNode(paramMap.get("id"))[0];
      this.childrenNodes = this.graphNodesService.findChildren(
        paramMap.get("id")
      );
    });
  }
}
