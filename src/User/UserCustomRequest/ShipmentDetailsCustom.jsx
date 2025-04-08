import React, { useState } from 'react';
import './ShipmentDetailsCustom.css';
import { Button, Checkbox, Form, Input, Row,Col, Card, Switch, Select, Divider, Tooltip, Radio, DatePicker, Table, Popconfirm, Dropdown, Space, Flex, Typography, InputNumber, Tabs, Alert  } from 'antd'
import {UserOutlined,LockOutlined, BookOutlined, FileDoneOutlined, FileTextOutlined, FileSyncOutlined, ProfileOutlined, QuestionCircleOutlined, DeleteOutlined, DownOutlined, CheckOutlined, BorderTopOutlined, PicCenterOutlined, PlusOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import { Option } from 'antd/es/mentions';
import "/node_modules/flag-icons/css/flag-icons.min.css";
import ReceiverSenderForm from './ReceiverSenderForm';

const ShipmentDetailsCustom = () => {
    const [transportMode, setTransportMode] = useState('');
    const [cargoType, setCargoType] = useState({
        isFood: false,
        commodityCode: '',
        description: '',
        invoiceValue: '',
        incoterms: '',
    });
    const [isTempControlled, setIsTempControlled] = useState(false);
    const [temperature, setTemperature] = useState({ min: '', max: '' });
    const [collection, setCollection] = useState([{ date: '', forklift: false, reference: '', type: '' }]);
    const [pickup, setPickup] = useState([{ date: '', forklift: false, reference: '', type: '' }]);
    const [services, setServices] = useState({ cargoInsurance: false, portCharges: false });
    const [customs, setCustoms] = useState({
        exportClearance: { enabled: false, option: '' },
        importClearance: { enabled: false, option: '' },
    });
    const [attachments, setAttachments] = useState([]);

    const handleCollectionChange = (index, field, value) => {
        const updated = [...collection];
        updated[index][field] = value;
        setCollection(updated);
    };

    const handlePickupChange = (index, field, value) => {
        const updated = [...pickup];
        updated[index][field] = value;
        setPickup(updated);
    };

    const handleFileUpload = (event) => {
        setAttachments([...attachments, ...event.target.files]);
    };

    const handleSubmit = () => {
        // Form submission logic here
        console.log({
            transportMode,
            cargoType,
            isTempControlled,
            temperature,
            collection,
            pickup,
            services,
            customs,
            attachments,
        });
        alert('Shipment details submitted successfully!');
    };

    return (
        <div className="shipment-details-form">
            <h2>Shipment Details (Custom Clearance)</h2>
            <div className="section">
    <h3>Clearance Type</h3>

    <label>
        EU Clearance (Europe to UK):
        <div style={{ display: 'flex', gap: '10px' }}>
            <label>
                <input
                    type="radio"
                    name="euClearance"
                    value="yes"
                    checked={customs.exportClearance.enabled === 'yes'}
                    onChange={() => setCustoms({ ...customs, exportClearance: { ...customs.exportClearance, enabled: 'yes' } })}
                />
                Yes
            </label>
            <label>
                <input
                    type="radio"
                    name="euClearance"
                    value="no"
                    checked={customs.exportClearance.enabled === 'no'}
                    onChange={() => setCustoms({ ...customs, exportClearance: { ...customs.exportClearance, enabled: 'no' } })}
                />
                No
            </label>
        </div>
    </label>

    <label>
        Rest of the World (to UK):
        <div style={{ display: 'flex', gap: '10px' }}>
            <label>
                <input
                    type="radio"
                    name="restWorldClearance"
                    value="yes"
                    checked={customs.importClearance.enabled === 'yes'}
                    onChange={() => setCustoms({ ...customs, importClearance: { ...customs.importClearance, enabled: 'yes' } })}
                />
                Yes
            </label>
            <label>
                <input
                    type="radio"
                    name="restWorldClearance"
                    value="no"
                    checked={customs.importClearance.enabled === 'no'}
                    onChange={() => setCustoms({ ...customs, importClearance: { ...customs.importClearance, enabled: 'no' } })}
                />
                No
            </label>
        </div>
    </label>

    <p>Make sure all health certificates are available.</p>
</div>

                
            {/* Transport Mode */}
            <div className="section">
                <h3>Transport Mode</h3>
                <div className="radio-group">
                    {['Air Freight', 'Sea Freight', 'Road Freight'].map((mode) => (
                        <label key={mode} className="radio-option">
                            <input
                                type="radio"
                                name="transportMode"
                                value={mode}
                                checked={transportMode === mode}
                                onChange={() => setTransportMode(mode)}
                            />
                            <span>{mode}</span>
                        </label>
                    ))}
                </div>
            </div>


         
<div className="section">
    <h3>Declaration Type</h3>
    <label>
        <input
            type="radio"
            name="declarationType"
            value="import"
            checked={cargoType.incoterms === 'import'}
            onChange={() => setCargoType({ ...cargoType, incoterms: 'import' })}
        />
        Import Declaration
    </label>
    <label>
        <input
            type="radio"
            name="declarationType"
            value="export"
            checked={cargoType.incoterms === 'export'}
            onChange={() => setCargoType({ ...cargoType, incoterms: 'export' })}
        />
        Export Declaration
    </label>
</div>

    <h1>Receiver and Sender Details Form</h1>
      <ReceiverSenderForm />

            {/* Type of Cargo */}
            <div>
                <h3>Type of Cargo</h3>
                <label>
                    <input
                        type="checkbox"
                        checked={cargoType.isFood}
                        onChange={(e) => setCargoType({ ...cargoType, isFood: e.target.checked })}
                    />
                    Food Product
                </label>
                <p style={{ color: 'red' }}>We do not deal with hazardous products.</p>
                <label>
                    Product Commodity Code *:
                    <input
                        type="text"
                        value={cargoType.commodityCode}
                        onChange={(e) => setCargoType({ ...cargoType, commodityCode: e.target.value })}
                    />
                </label>
                <label>
                    Good Description:
                    <input
                        type="text"
                        value={cargoType.description}
                        onChange={(e) => setCargoType({ ...cargoType, description: e.target.value })}
                    />
                </label>
                <label>
                    Invoice Value *:
                    <input
                        type="text"
                        value={cargoType.invoiceValue}
                        onChange={(e) => setCargoType({ ...cargoType, invoiceValue: e.target.value })}
                    />
                </label>
                <label>
                    Payment Incoterms *:
                    <select
                        value={cargoType.incoterms}
                        onChange={(e) => setCargoType({ ...cargoType, incoterms: e.target.value })}
                    >
                        <option value="">Select</option>
                        <option value="FOB">FOB</option>
                        <option value="CIF">CIF</option>
                        <option value="EXW">EXW</option>
                    </select>
                </label>
            </div>

            <Row>
                        <Col span={24}><Divider /></Col>
                    </Row>
            <Row>
                        <Col span={24}>
                            <div className='shipment-dropdown' >
                                <Row gutter={0}>
                                    <Col span={5}>
                                        <Dropdown className='dropdown'
                                            trigger={['click']}
                                            menu={{ items:[{key:1}]  }}
                                            dropdownRender={(menu) => (
                                                <div className='shipment-drawer'>
                                                    <FormOrigin/>
                                                </div>
                                            )}
                                            >
                                            <div className='wrapper' onClick={(e) => e.preventDefault()}>
                                                <strong className='title'>Origin</strong> <CheckOutlined /> <br/>
                                                Factory/Warehouse | <span className="flag fi fi-ch"></span> China 
                                            </div>
                                        </Dropdown>
                                    </Col>
                                    <Col span={1}><Divider type="vertical" style={{height:'100%'}} /></Col>
                                    <Col span={5}>
                                        <Dropdown className='dropdown'
                                            trigger={['click']}
                                            menu={{ items:[{key:1}]  }}
                                            dropdownRender={(menu) => (
                                                <div className='shipment-drawer'>
                                                    <FormDestination/>
                                                </div>
                                            )}
                                            >
                                            <div className='wrapper' onClick={(e) => e.preventDefault()}>
                                                <strong className='title'>Destination</strong> <CheckOutlined /> <br/>
                                                Business address | <span className="flag fi fi-ch"></span> France 
                                            </div>
                                        </Dropdown>                                        
                                    </Col>
                                    <Col span={1}><Divider type="vertical" style={{height:'100%'}} /></Col>
                                    <Col span={5}>
                                        <Dropdown className='dropdown'
                                            trigger={['click']}
                                            menu={{ items:[{key:1}]  }}
                                            dropdownRender={(menu) => (
                                                <div className='shipment-drawer'>
                                                    <FormLoads/>
                                                </div>
                                            )}
                                            >
                                            <div className='wrapper' onClick={(e) => e.preventDefault()}>
                                                <strong className='title'>Loads</strong> <CheckOutlined /> <br/>
                                                2 Units | Total : 0.02 cbm, 2kg
                                            </div>
                                        </Dropdown>
                                    </Col>
                                    <Col span={1}><Divider type="vertical" style={{height:'100%'}} /></Col>
                                    <Col span={6}>
                                        <Dropdown className='dropdown'
                                            trigger={['click']}
                                            menu={{ items:[{key:1}]  }}
                                            dropdownRender={(menu) => (
                                                <div className='shipment-drawer'>
                                                    <FormGoods/>
                                                </div>
                                            )}
                                            >
                                            <div className='wrapper' onClick={(e) => e.preventDefault()}>
                                                <strong className='title'>Goods</strong> <CheckOutlined /> <br/>
                                                $20,000 | Goods are ready
                                            </div>
                                        </Dropdown>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        
                    </Row>
                    <Row>
                        <Col span={24}><Divider /></Col>
                    </Row>

            {/* Temperature Controlled Goods */}
            <div>
                <h3>Temperature Controlled Goods</h3>
                <label>
                    <input
                        type="radio"
                        name="tempControlled"
                        value="yes"
                        checked={isTempControlled === true}
                        onChange={() => setIsTempControlled(true)}
                    />
                    Yes
                </label>
                <label>
                    <input
                        type="radio"
                        name="tempControlled"
                        value="no"
                        checked={isTempControlled === false}
                        onChange={() => setIsTempControlled(false)}
                    />
                    No
                </label>
                {isTempControlled && (
                    <div>
                        <label>
                            Min Temperature:
                            <input
                                type="text"
                                value={temperature.min}
                                onChange={(e) => setTemperature({ ...temperature, min: e.target.value })}
                            />
                        </label>
                        <label>
                            Max Temperature:
                            <input
                                type="text"
                                value={temperature.max}
                                onChange={(e) => setTemperature({ ...temperature, max: e.target.value })}
                            />
                        </label>
                    </div>
                )}
            </div>

            {/* Collection and Pickup */}
            {['Collection', 'Pickup'].map((section, i) => (
                <div key={section}>
                    <h3>{section}</h3>
                    {(i === 0 ? collection : pickup).map((item, index) => (
                        <div key={index}>
                            <label>
                                {section === 'Collection' ? 'Pickup Date' : 'Deliver Date'}:
                                <input
                                    type="date"
                                    value={item.date}
                                    onChange={(e) =>
                                        section === 'Collection'
                                            ? handleCollectionChange(index, 'date', e.target.value)
                                            : handlePickupChange(index, 'date', e.target.value)
                                    }
                                />
                            </label>
                            <label>
                                Forklift Required:
                                <input
                                    type="checkbox"
                                    checked={item.forklift}
                                    onChange={(e) =>
                                        section === 'Collection'
                                            ? handleCollectionChange(index, 'forklift', e.target.checked)
                                            : handlePickupChange(index, 'forklift', e.target.checked)
                                    }
                                />
                            </label>
                            <label>
                                Reference Text:
                                <input
                                    type="text"
                                    value={item.reference}
                                    onChange={(e) =>
                                        section === 'Collection'
                                            ? handleCollectionChange(index, 'reference', e.target.value)
                                            : handlePickupChange(index, 'reference', e.target.value)
                                    }
                                />
                            </label>
                            <label>
                                Type:
                                <input
                                    type="text"
                                    value={item.type}
                                    onChange={(e) =>
                                        section === 'Collection'
                                            ? handleCollectionChange(index, 'type', e.target.value)
                                            : handlePickupChange(index, 'type', e.target.value)
                                    }
                                />
                            </label>
                        </div>
                    ))}
                </div>
            ))}

            {/* Additional Services */}
            <div>
                <h3>Additional Services</h3>
                <label>
                    <input
                        type="checkbox"
                        checked={services.cargoInsurance}
                        onChange={(e) => setServices({ ...services, cargoInsurance: e.target.checked })}
                    />
                    Cargo Insurance
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={services.portCharges}
                        onChange={(e) => setServices({ ...services, portCharges: e.target.checked })}
                    />
                    Port Charges
                </label>
            </div>

            {/* Customs Services */}
            <div>
                <h3>Custom Services</h3>
                <label>
                    Export Customs Clearance:
                    <input
                        type="checkbox"
                        checked={customs.exportClearance.enabled}
                        onChange={(e) =>
                            setCustoms({ ...customs, exportClearance: { ...customs.exportClearance, enabled: e.target.checked } })
                        }
                    />
                    <select
                        value={customs.exportClearance.option}
                        onChange={(e) =>
                            setCustoms({ ...customs, exportClearance: { ...customs.exportClearance, option: e.target.value } })
                        }
                    >
                        <option value="">Select</option>
                        <option value="Option1">Option 1</option>
                        <option value="Option2">Option 2</option>
                    </select>
                </label>
                <label>
                    Import Customs Clearance:
                    <input
                        type="checkbox"
                        checked={customs.importClearance.enabled}
                        onChange={(e) =>
                            setCustoms({ ...customs, importClearance: { ...customs.importClearance, enabled: e.target.checked } })
                        }
                    />
                    <select
                        value={customs.importClearance.option}
                        onChange={(e) =>
                            setCustoms({ ...customs, importClearance: { ...customs.importClearance, option: e.target.value } })
                        }
                    >
                        <option value="">Select</option>
                        <option value="Option1">Option 1</option>
                        <option value="Option2">Option 2</option>
                    </select>
                </label>
            </div>

            {/* Attachments */}
            <div>
                <h3>Attachments</h3>
                <input type="file" multiple onChange={handleFileUpload} />
            </div>

            {/* Submit Button */}
            <button onClick={handleSubmit}>Submit Booking</button>
        </div>
    );
};


const FormOrigin = (props)=>{
    return (
        <>
        <div style={{backgroundColor:'#efefef', padding: '20px',border: '1px gray solid' ,borderRadius: '24px'}}>
        <Row gutter={12}>
            <Col span={24}>
                <h2>Where are you shipping to?</h2>
            </Col>
            <Col span={8}>
                <label>Type</label>
                <Select
                      showSearch
                      placeholder="Type"
                      style={{ width: '100%' }} 
                      //onChange={handleChange}
                      options={[
                        { value: 'warehouse', label: 'Factory Warehouse' },
                      ]}     
                    />
            </Col>
            <Col span={8}>
                <label>Country</label>
                <Select
                      showSearch
                      placeholder="Country"
                      style={{ width: '100%' }} 
                      //onChange={handleChange}
                      options={[
                        { value: 'warehouse', label: 'Factory Warehouse' },
                      ]}
                     
                    />
            </Col>
            <Col span={8}>
                <label>Address</label>
                <Input placeholder='Address'/>
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Divider style={{margin:'10px 0'}}/>
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Button type="primary">Submit</Button>
            </Col>
        </Row>
        </div>
        </>
    )
}



const FormDestination = (props)=>{
    return (
        <>
        <div style={{backgroundColor:'#efefef', padding: '20px',border: '1px gray solid' ,borderRadius: '24px'}}>
        <Row gutter={12}>
            <Col span={24}>
                <h2>Where are you shipping from?</h2>
            </Col>
            <Col span={8}>
                <label>Type</label>
                <Select
                      showSearch
                      placeholder="Type"
                      style={{ width: '100%' }} 
                      //onChange={handleChange}
                      options={[
                        { value: 'warehouse', label: 'Factory Warehouse' },
                      ]}     
                    />
            </Col>
            <Col span={8}>
                <label>Country</label>
                <Select
                      showSearch
                      placeholder="Country"
                      style={{ width: '100%' }} 
                      //onChange={handleChange}
                      options={[
                        { value: 'warehouse', label: 'Factory Warehouse' },
                      ]}
                     
                    />
            </Col>
            <Col span={8}>
                <label>Address</label>
                <Input placeholder='Address'/>
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Divider style={{margin:'10px 0'}}/>
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Button type="primary">Submit</Button>
            </Col>
        </Row>
        </div>
        </>
    )
}


const FormGoods = (props)=>{
    return (
        <>
        <div style={{backgroundColor:'#efefef', padding: '20px',border: '1px gray solid' ,borderRadius: '24px'}}>
        <Row gutter={12}>
            <Col span={24}>
                <h2>Tell us about your goods</h2>
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <label>Good Value</label>
                <Form.Item
                    name="donation"
                    noStyle
                    rules={[{ required: true, message: 'Please input donation amount!' }]}
                >
                    <InputNumber addonAfter={
                        <Form.Item name="suffix" noStyle>
                        <Select style={{ width: 70 }}>
                          <Option value="USD">$</Option>
                          <Option value="CNY">¥</Option>
                        </Select>
                      </Form.Item>
                    } style={{ width: '100%' }} />
                </Form.Item>
            </Col>
        </Row>
        <Row>
            <Col style={{marginBottom:10}}>
                <Checkbox>Shipment contains hazardous goods Commercial only</Checkbox>
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <label>Are your goods ready? </label>
                <Select
                      showSearch
                      placeholder="Country"
                      style={{ width: '100%' }} 
                      //onChange={handleChange}
                      options={[
                        { value: 'warehouse', label: 'Factory Warehouse' },
                      ]}
                     
                    />
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Divider style={{margin:'10px 0'}}/>
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Button type="primary">Submit</Button>
            </Col>
        </Row>
        </div>
        </>
    )
}

const FormLoads = (props)=>{
    
    const LooseCargo = ()=>{
        return (
            <>
            <div style={{backgroundColor:'#efefef', padding: '20px',border: '1px gray solid' ,borderRadius: '24px'}}>
            <Row gutter={[12,12]}>
                <Col span={24}>
                    <Radio.Group name="radiogroup" defaultValue={1}>
                        <Radio value={1}>Calculate by unit type</Radio>
                        <Radio value={2}>Calculate by total shipment</Radio>
                    </Radio.Group>
                </Col>

                <Col span={18}>
                    <span>Package type</span>
                    <Form.Item name="input-number" noStyle>
                        <Radio.Group  defaultValue="a" style={{display:'block', textAlign:'center'}} className='full-width'  >
                            <Radio.Button value="a">Pallets</Radio.Button>
                            <Radio.Button value="b">Box/Crates</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <span># of units</span>
                    <Form.Item name="input-number" noStyle >
                        <InputNumber min={1}  style={{width:'100%'}} />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <label>Pallet type</label>
                    <Select
                        showSearch
                        placeholder="Pallet type"
                        style={{ width: '100%' }} 
                        //onChange={handleChange}
                        options={[
                            { value: 'Pallet', label: 'Pallet (non speficied size)' },
                        ]}
                        
                    />
                </Col>

                <Col span={18}>
                    <label>Dimensions (L×W×H per unit)</label>
                    <Form.Item>
                        <Space.Compact>
                            <Form.Item
                                name={['L','H','H']}
                                noStyle
                                rules={[{ required: true, message: 'Please input donation amount!' }]}
                                >
                                <InputNumber placeholder='L' style={{ width: '100%' }}/>
                            </Form.Item>
                            <Form.Item
                                name={['L','H','H']}
                                noStyle
                                rules={[{ required: true, message: 'Please input donation amount!' }]}
                                >
                                <InputNumber placeholder='W' style={{ width: '100%' }}/>
                            </Form.Item>
                            <Form.Item
                                name={['L','H','H']}
                                noStyle
                                rules={[{ required: true, message: 'Please input donation amount!' }]}
                                >
                                <InputNumber placeholder='H' addonAfter={
                                    <Form.Item name="suffix" noStyle>
                                        <Select style={{ width: 70 }}>
                                            <Option value="KG">KG</Option>
                                            <Option value="LB">LB</Option>
                                        </Select>
                                    </Form.Item>
                                } style={{ width: '100%' }} />
                            </Form.Item>
                        </Space.Compact>
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <label>Weight (Per unit)</label>
                    <Form.Item
                        name="donation"
                        rules={[{ required: true, message: 'Please input donation amount!' }]}
                        >
                        <InputNumber addonAfter={
                            <Form.Item name="suffix" noStyle>
                                <Select style={{ width: 70 }}>
                                    <Option value="KG">KG</Option>
                                    <Option value="LB">LB</Option>
                                </Select>
                        </Form.Item>
                        } style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Divider style={{margin:'10px 0'}}/>
                </Col>
            </Row>
            <Row>
                <Col span={24} style={{textAlign:'right'}}>
                    <Button icon={<PlusOutlined />} >Add Another</Button> &nbsp;
                    <Button type="primary">Confirm</Button>
                </Col>
            </Row>
            </div>
            </>
        )
    }

    const Container = ()=>{
        return (
            <>
            <div style={{backgroundColor:'#efefef', padding: '20px',border: '1px gray solid' ,borderRadius: '24px'}}>
            <Row gutter={[12,12]}>
                <Col span={24}>
                <Alert 
                    message="Containers can be shipped to or from a business address only if there is a loading dock." 
                    type="info" 
                    showIcon 
                    icon={<ExclamationCircleOutlined />}
                />
                </Col>
                <Col span={6}>
                    <label># of units</label>
                    <Form.Item
                        name="donation"
                        rules={[{ required: true, message: 'Please input donation amount!' }]}
                        >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col span={18}>
                    <label>Container type</label>
                    <Form.Item name="input-number" noStyle>
                        <Radio.Group  defaultValue="a" style={{display:'block', textAlign:'center'}} className='quater-width'  >
                            <Radio.Button value="a">20'</Radio.Button>
                            <Radio.Button value="b">40'</Radio.Button>
                            <Radio.Button value="b">40' HC</Radio.Button>
                            <Radio.Button value="b">45' HC</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Checkbox>Overweight</Checkbox>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Divider style={{margin:'10px 0'}}/>
                </Col>
            </Row>
            <Row>
                <Col span={24} style={{textAlign:'right'}}>
                    <Button icon={<PlusOutlined />} >Add Another</Button> &nbsp;
                    <Button type="primary">Confirm</Button>
                </Col>
            </Row>
            </div>
            </>
        )
    }
    
    return (
        <>
        <div style={{backgroundColor:'#efefef', padding: '20px',border: '1px gray solid' ,borderRadius: '24px'}}>
        <Row gutter={12}>
            <Col span={24}>
                <Tabs style={{width:'700px'}}
                    defaultActiveKey="loose_cargo"
                    items = {[
                        {
                            key: 'loose_cargo',
                            label: "Loose Cargo",
                            children: <LooseCargo/>,
                            icon: <BorderTopOutlined />,
                        },
                        {
                            key: 'container',
                            label: Container,
                            children: <Container/>,
                            icon: <PicCenterOutlined />,
                        }
                    ]}
                />
            </Col>
        </Row>
        </div>
        </>
    )
}



export default ShipmentDetailsCustom;
