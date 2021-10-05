import React from 'react';
import { Stage, Layer, Image } from 'react-konva';
import useImage from 'use-image';
import bowl from '../assets/bowl.png'
import './drag.css'

const URLImage = ({ image, handleClick }) => {
    const [img] = useImage(image.src);

    return (
        <Image
            image={img}
            x={image.x}
            y={image.y}
            width={100}
            height={90}
            // I will use offset to set origin to the center of the image
            offsetX={img ? 100 / 2 : 0}
            offsetY={img ? 90 / 2 : 0}
            onClick={handleClick}
        />
    );
};

export default class Drop extends React.Component {
    state = {
        dragUrl: null,
        stageRef: null,
        images: []
    }
    render() {
        return (
            <div className="">
                <br />
                <img
                    alt="lion"
                    src={bowl}
                    draggable="true"
                    // {count < 10 ? "true" : "false"}
                    onDragStart={(e) => {
                        this.state.dragUrl.current = e.target.src;
                    }}
                    className="noselect"
                    style={{ width: "100px", height: "90px" }}
                />
                <br />
                <br />
                <div
                    onDrop={(e) => {
                        e.preventDefault();
                        // register event position
                        this.state.stageRef.current.setPointersPositions(e);
                        // add image
                        this.setState({
                            images: this.state.images.concat([
                                {
                                    ...this.state.stageRef.current.getPointerPosition(),
                                    src: this.state.dragUrl.current,
                                },
                            ])
                        });
                        this.props.incCount()
                    }}
                    onDragOver={(e) => e.preventDefault()}
                    style={{ margin: "auto", width: "300px", height: "200px", border: "3px solid green" }}
                >
                    <Stage
                        width={300}
                        height={200}
                        ref={this.state.stageRef}
                    >
                        <Layer>
                            {this.state.images.map((image) => {
                                return <URLImage image={image} handleClick={() => {
                                    this.setState({
                                        images : this.state.images.filter(item => item !== image)
                                    })
                                    this.props.incCount()
                                }} />;
                            })}
                        </Layer>
                    </Stage>

                </div>
                <div>
                    <h1>{this.props.count}</h1>
                </div>
            </div>
        )
    }

}

